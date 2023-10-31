from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.user import UserWithRole
from backend.common.core.enums import Roles
from backend.common.db.init import get_session
from backend.common.models.publication import NewPublication, Publication
from backend.common.models.user import User
from backend.common.repositories.publications_repo import publications_repo

router = APIRouter(
    prefix="/publications",
    tags=["Publications"],
)

superuser = UserWithRole(Roles.SUPERUSER)


@router.get("/", response_model=list[Publication])
async def get_publications(
    session: AsyncSession = Depends(get_session), user: User = Depends(superuser)
):
    return await publications_repo.get_all(session, user)


@router.put("/", response_model=Publication)
async def create_publication(
    new_publication: NewPublication,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await publications_repo.create(session, user, new_publication)
