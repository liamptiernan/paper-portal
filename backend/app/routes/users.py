from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.user import UserWithRole
from backend.common.core.enums import UserRole
from backend.common.db.init import get_session
from backend.common.models.user import User
from backend.common.repositories.users_repo import users_repo

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

pub_admin = UserWithRole(UserRole.PUBADMIN)


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
    return await users_repo.update(session, user, user_updates)


@router.delete("/{id}", response_model=None)
async def delete_user(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(pub_admin),
):
    return await users_repo.delete(session, user, id)
