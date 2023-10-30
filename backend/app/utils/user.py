import logging
from dataclasses import dataclass

import jwt
from fastapi import Depends, status
from fastapi.exceptions import HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.custom_exceptions import (
    BadCredentialsException, RequiresAuthenticationException,
    UnableCredentialsException)
from backend.common.core.settings import settings
from backend.common.db.init import get_session

scheme = HTTPBearer(auto_error=False)


@dataclass
class JsonWebToken:
    """Perform JSON Web Token (JWT) validation using PyJWT"""

    jwt_access_token: str
    auth0_issuer_url: str = f"https://{settings.auth0_domain}/"
    auth0_audience: str = settings.auth0_audience
    algorithm: str = "RS256"
    jwks_uri: str = f"{auth0_issuer_url}.well-known/jwks.json"

    def validate(self):
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
            print(payload)
        except jwt.exceptions.PyJWKClientError:
            raise UnableCredentialsException
        except jwt.exceptions.InvalidTokenError:
            raise BadCredentialsException
        return payload


async def get_current_user(
    auth: HTTPAuthorizationCredentials = Depends(scheme),
    session: AsyncSession = Depends(get_session),
):
    try:
        token = auth.credentials
        payload = JsonWebToken(token).validate()
    except Exception as ex:
        logging.error(ex)
        raise RequiresAuthenticationException
    print(payload)
    # email = payload.get(email_key)
    # return email
    # user = await user_repo.get_by_email(session, email) if email else None

    # if not user:
    #     logging.error(f"User not found: email={email}")
    #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    # return user


# Allows for "Paramerterized" Deps in FastAPI
class UserWithRole:
    def __init__(self, *roles) -> None:
        self.roles = roles

    def __call__(self, user=Depends(get_current_user)):
        for required_role in self.roles:
            if user.role_enum_value not in required_role:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
        return "awww yeah"
