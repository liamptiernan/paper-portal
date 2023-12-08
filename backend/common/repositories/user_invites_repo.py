from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import UserInvite
from backend.common.models.user import User as AppUser
from backend.common.models.user_invite import UserInvite as AppUserInvite
from backend.common.repositories.base_repo import OrgRepo


class UserInvitesRepo(OrgRepo[UserInvite, AppUserInvite]):
    async def get_by_email(
        self, session: AsyncSession, user: AppUser, target_email: str
    ):
        base_query = (
            select(UserInvite)
            .filter_by(target_email=target_email, accepted=False)
            .limit(1)
        )
        query = await self.auth_select(session, user, base_query)
        model = (await session.execute(query)).unique().scalar_one_or_none()
        if model:
            return await self.db_to_app(session, model)
        return None

    async def get_all_for_user(
        self,
        session: AsyncSession,
        user: AppUser,
    ) -> list[AppUserInvite]:
        query = select(UserInvite).filter_by(target_email=user.email, accepted=False)
        return [
            await self.db_to_app(session, model.t[0])
            for model in (await session.execute(query)).unique()
        ]


user_invites_repo = UserInvitesRepo(UserInvite, AppUserInvite)
