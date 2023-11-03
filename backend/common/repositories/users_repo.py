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
            full_name=db_model.full_name,
            email=db_model.email,
            role=db_model.role,
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
            full_name=app_model.full_name,
            email=app_model.email,
            role=app_model.role,
            org_id=app_model.org_id,
        )

    async def get_by_email_no_auth(
        self,
        session: AsyncSession,
        email: str,
    ) -> AppUser | None:
        query = select(User).filter_by(email=email).limit(1)
        db_user = await session.scalar(query)
        return await self.db_to_app(session, db_user) if db_user else None


users_repo = UsersRepo(User, AppUser)
