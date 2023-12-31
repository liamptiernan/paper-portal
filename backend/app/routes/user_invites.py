from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.user import UserWithRole
from backend.common.core.enums import UserRole
from backend.common.db.init import get_session
from backend.common.models.user_invite import UserInvite, NewUserInvite
from backend.common.models.user import User
from backend.common.repositories.user_invites_repo import user_invites_repo
from backend.common.repositories.users_repo import users_repo

router = APIRouter(
    prefix="/user-invites",
    tags=["UserInvites"],
)

pub_admin = UserWithRole(UserRole.PUBADMIN)
base_user = UserWithRole()


class UserInvitesTableResponse(BaseModel):
    data: list[UserInvite]
    count: int


@router.get("/", response_model=UserInvitesTableResponse)
async def get_all_user_invites(
    session: AsyncSession = Depends(get_session), user: User = Depends(pub_admin)
):
    user_invites = await user_invites_repo.get_all(session, user)
    return UserInvitesTableResponse(data=user_invites, count=len(user_invites))


@router.get("/current", response_model=UserInvitesTableResponse)
async def get_invites_by_current_user_email(
    session: AsyncSession = Depends(get_session), user: User = Depends(base_user)
):
    user_invites = await user_invites_repo.get_all_for_user(session, user)
    return UserInvitesTableResponse(data=user_invites, count=len(user_invites))


@router.post("/accept", response_model=User)
async def accept_user_invite(
    id: int = Body(embed=True),
    session: AsyncSession = Depends(get_session),
    user: User = Depends(base_user),
):
    invite = await user_invites_repo.get(session, id, user)
    if invite is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invite not found"
        )
    invite.accepted = True
    updated_user = await users_repo.change_org(session, user, invite.org_id)
    await user_invites_repo.update(session, user, invite)
    return updated_user


@router.get("/{id}", response_model=UserInvite)
async def get_user_invite(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(pub_admin),
):
    user_invite = await user_invites_repo.get(session, id, user)
    if user_invite is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invite not found"
        )
    return user_invite


@router.put("/", response_model=UserInvite, status_code=status.HTTP_201_CREATED)
async def create_user_invite(
    new_user_invite: NewUserInvite,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(pub_admin),
):
    new_user_invite.org_id = user.org_id
    return await user_invites_repo.create(session, user, new_user_invite)


@router.delete("/{id}", response_model=None)
async def delete_user_invite(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(base_user),
):
    return await user_invites_repo.delete(session, user, id)


# if you're a base user, you have to have rights to that invite
# else if you're a pub admin, you have to have rights to the org
