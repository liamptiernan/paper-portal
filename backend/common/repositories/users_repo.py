from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import User
from backend.common.models.user import User as AppUser
from backend.common.models.organization import Organization as AppOrganization
from backend.common.repositories.base_repo import BaseRepo


class UsersRepo(BaseRepo[User, AppUser]):
    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: User,
    ) -> AppUser:
        return AppUser(
            id=db_model.id,
            given_name=db_model.given_name,
            family_name=db_model.family_name,
            auth_id=db_model.auth_id,
            email=db_model.email,
            roles=db_model.roles,
            org_id=db_model.org_id,
            org=AppOrganization(**db_model.org.__dict__),
        )

    async def app_to_db(
        self,
        session: AsyncSession,
        app_model: AppUser,
    ) -> User:
        return User(
            id=app_model.id,
            given_name=app_model.given_name,
            family_name=app_model.family_name,
            auth_id=app_model.auth_id,
            email=app_model.email,
            roles=app_model.roles,
            org_id=app_model.org_id,
        )

    async def get_by_email(
        self,
        session: AsyncSession,
        user: AppUser,
        email: str,
    ) -> AppUser | None:
        query = select(User).filter_by(email=email).limit(1)
        query = await self.auth_select(session, user, query)
        db_user = await session.scalar(query)
        return await self.db_to_app(session, db_user) if db_user else None

    async def get_api_user(self, session: AsyncSession) -> AppUser:
        query = select(User).filter_by(email="api@marketangler.com").limit(1)
        api_user = await session.scalar(query)
        if api_user is None:
            raise Exception("API user not found")
        return api_user


users_repo = UsersRepo(User, AppUser)
