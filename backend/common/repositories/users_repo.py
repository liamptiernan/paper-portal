from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import User
from backend.common.models.user import User as AppUser
from backend.common.repositories.base_repo import BaseRepo


class UsersRepo(BaseRepo[User, AppUser]):
    async def get_by_email_no_auth(
        self,
        session: AsyncSession,
        email: str,
    ) -> AppUser | None:
        query = select(User).filter_by(email=email).limit(1)
        db_user = await session.scalar(query)
        return await self.db_to_app(session, db_user) if db_user else None


users_repo = UsersRepo(User, AppUser)
