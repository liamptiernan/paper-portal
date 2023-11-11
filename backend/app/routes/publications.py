from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
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


class PublicationsTableResponse(BaseModel):
    data: list[Publication]
    count: int


@router.get("/", response_model=PublicationsTableResponse)
async def get_all_publications(
    session: AsyncSession = Depends(get_session), user: User = Depends(superuser)
):
    publications = await publications_repo.get_all(session, user)
    return PublicationsTableResponse(data=publications, count=len(publications))


@router.get("/{id}", response_model=Publication)
async def get_publication(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await publications_repo.get(session, id, user)


@router.post("/", response_model=Publication)
async def update_publication(
    pub_updates: Publication,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await publications_repo.update(session, user, pub_updates)


@router.put("/", response_model=Publication, status_code=status.HTTP_201_CREATED)
async def create_publication(
    new_publication: NewPublication,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await publications_repo.create(session, user, new_publication)


@router.delete("/{id}", response_model=Publication | None)
async def delete_publication(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await publications_repo.delete(session, user, id)
