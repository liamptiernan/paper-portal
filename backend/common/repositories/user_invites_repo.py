from sqlalchemy import select, Select, Update
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import UserInvite
from backend.common.core.enums import UserRole
from backend.common.models.user import User as AppUser
from backend.common.models.user_invite import UserInvite as AppUserInvite
from backend.common.repositories.base_repo import OrgRepo


class UserInvitesRepo(OrgRepo[UserInvite, AppUserInvite]):
    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: UserInvite,
    ) -> AppUserInvite:
        return AppUserInvite(
            id=db_model.id,
            target_email=db_model.target_email,
            target_roles=db_model.target_roles,
            accepted=db_model.accepted,
            declined=db_model.declined,
            org_id=db_model.org_id,
            org_name=db_model.org.name,
        )

    async def app_to_db(
        self,
        session: AsyncSession,
        app_invite: AppUserInvite,
    ) -> UserInvite:
        return UserInvite(
            id=app_invite.id,
            target_email=app_invite.target_email,
            target_roles=app_invite.target_roles,
            accepted=app_invite.accepted,
            declined=app_invite.declined,
            org_id=app_invite.org_id,
        )

    async def auth_select(
        self, session: AsyncSession, user: AppUser, query: Select | Update
    ) -> Select[UserInvite] | Update[UserInvite]:
        if UserRole.SUPERUSER in user.roles:
            return query
        if UserRole.PUBADMIN:
            return query.filter(
                (UserInvite.org_id == user.org_id)
                | (UserInvite.target_email == user.email)
            )
        return query.filter_by(target_email=user.email)

    async def auth_delete(
        self, session: AsyncSession, user: AppUser, query: Select[tuple[UserInvite]]
    ) -> Select[tuple[UserInvite]]:
        if UserRole.SUPERUSER in user.roles:
            return query
        if UserRole.PUBADMIN:
            return query.filter(
                (UserInvite.org_id == user.org_id)
                | (UserInvite.target_email == user.email)
            )
        return query.filter_by(target_email=user.email)

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
