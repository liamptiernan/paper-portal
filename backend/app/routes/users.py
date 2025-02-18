from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.user import UserWithRole
from backend.common.core.enums import UserRole
from backend.common.db.init import get_session
from backend.common.models.user import User
from backend.common.models.organization import NewOrganization
from backend.common.repositories.users_repo import users_repo
from backend.common.repositories.organizations_repo import organizations_repo

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

pub_admin = UserWithRole(UserRole.PUBADMIN)
superuser = UserWithRole(UserRole.SUPERUSER)


class UsersTableResponse(BaseModel):
    data: list[User]
    count: int


@router.get("/", response_model=UsersTableResponse)
async def get_all_users(
    session: AsyncSession = Depends(get_session), user: User = Depends(pub_admin)
):
    users = await users_repo.get_all(session, user)
    return UsersTableResponse(data=users, count=len(users))


@router.get("/{id}", response_model=User)
async def get_user(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(pub_admin),
):
    fetched_user = await users_repo.get(session, id, user)
    if fetched_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return fetched_user


@router.post("/", response_model=User)
async def update_user(
    user_updates: User,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(pub_admin),
):
    if user_updates.id == user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request",
        )
    return await users_repo.update(session, user, user_updates)


@router.post("/{id}/remove", response_model=User)
async def remove_user_from_org(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(pub_admin),
):
    if id == user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request",
        )
    existing_user = await users_repo.get(session, id, user)
    if existing_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    # TODO: we should have a concept of a personal org that gets reassigned
    created_org = await organizations_repo.create(
        session, user, NewOrganization(name="Personal")
    )
    existing_user.roles = [UserRole.PUBADMIN]
    return await users_repo.change_org(session, existing_user, created_org.id)


@router.delete("/{id}", response_model=None)
async def delete_user(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    if id == user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request",
        )
    return await users_repo.delete(session, user, id)
