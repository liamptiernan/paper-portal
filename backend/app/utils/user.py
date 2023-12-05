from dataclasses import dataclass
import logging
from typing import Any

import jwt
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.custom_exceptions import (
    BadCredentialsException,
    RequiresAuthenticationException,
    UnableCredentialsException,
    PermissionDeniedException,
)
from backend.common.core.settings import settings
from backend.common.core.enums import UserRole
from backend.common.db.init import get_session
from backend.common.models.user import User, NewUser
from backend.common.models.organization import NewOrganization
from backend.common.repositories.users_repo import users_repo
from backend.common.repositories.organizations_repo import organizations_repo

scheme = HTTPBearer(auto_error=False)


@dataclass
class JsonWebToken:
    """Perform JSON Web Token (JWT) validation using PyJWT"""

    jwt_access_token: str
    auth0_issuer_url: str = f"https://{settings.auth0_domain}/"
    auth0_audience: str = settings.auth0_audience
    algorithm: str = "RS256"
    jwks_uri: str = f"{auth0_issuer_url}.well-known/jwks.json"

    def validate(self) -> dict:
        try:
            jwks_client = jwt.PyJWKClient(self.jwks_uri, cache_keys=True)
            jwt_signing_key = jwks_client.get_signing_key_from_jwt(
                self.jwt_access_token
            ).key
            payload = jwt.decode(
                self.jwt_access_token,
                jwt_signing_key,
                algorithms=[self.algorithm],
                audience=self.auth0_audience,
                issuer=self.auth0_issuer_url,
            )
        except jwt.exceptions.PyJWKClientError:
            raise UnableCredentialsException
        except jwt.exceptions.InvalidTokenError:
            raise BadCredentialsException
        return payload


async def create_new_authd_user(
    payload: dict[str, Any], session: AsyncSession, api_user: User
) -> User:
    attr_key = settings.auth0_attr_key
    given_name = payload.get(attr_key + "given_name")
    family_name = payload.get(attr_key + "family_name")
    user_id = payload.get(attr_key + "user_id")
    email = payload.get(attr_key + "email")
    if not (email and given_name and family_name and user_id):
        raise Exception("Payload incomplete")

    new_org = NewOrganization(name="New Organization")

    created_org = await organizations_repo.create(session, api_user, new_org)

    new_user = NewUser(
        given_name=given_name,
        family_name=family_name,
        auth_id=user_id,
        email=email,
        org_id=created_org.id,
        roles=[UserRole.PUBADMIN],
    )
    return await users_repo.create(session, api_user, new_user)


async def get_current_user(
    auth: HTTPAuthorizationCredentials = Depends(scheme),
    session: AsyncSession = Depends(get_session),
) -> User:
    try:
        token = auth.credentials
        payload = JsonWebToken(token).validate()
    except Exception as ex:
        logging.error(ex)
        raise RequiresAuthenticationException

    attr_key = settings.auth0_attr_key
    email = payload.get(attr_key + "email")
    if not email:
        raise Exception("Payload incomplete")
    api_user = await users_repo.get_api_user(session)
    user = await users_repo.get_by_email(session, api_user, email)
    if not user:
        # if no user but they auth'd, we need to add them to our db
        logging.info(f"User not found: email={email}. Creating user")
        user = await create_new_authd_user(payload, session, api_user)
    return user


class UserWithRole:
    """
    - Allows for "Paramerterized" Deps in FastAPI
    - UserRole are considered as OR
    """

    def __init__(self, *roles: UserRole) -> None:
        self.roles = roles

    def __call__(self, user: User = Depends(get_current_user)):
        if not self.roles:
            return user

        if any(role in user.roles for role in self.roles):
            return user
        raise PermissionDeniedException
