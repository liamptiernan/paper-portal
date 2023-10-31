import logging
from dataclasses import dataclass

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
from backend.common.core.enums import Roles
from backend.common.db.init import get_session
from backend.common.models.user import User
from backend.common.repositories.users_repo import users_repo

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
    email_key = settings.auth0_email_key
    email = payload.get(email_key)
    user = await users_repo.get_by_email_no_auth(session, email) if email else None
    if not user:
        logging.error(f"User not found: email={email}")
        raise PermissionDeniedException

    return user


class UserWithRole:
    """
    - Allows for "Paramerterized" Deps in FastAPI
    - Roles are considered as OR
    """

    def __init__(self, *roles: Roles) -> None:
        self.roles = roles

    def __call__(self, user: User = Depends(get_current_user)):
        if user.role is None:
            if not self.roles:
                return user
            raise PermissionDeniedException

        if user.role.value not in self.roles:
            raise PermissionDeniedException
        return user
