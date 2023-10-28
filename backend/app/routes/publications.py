from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.init import get_session
from backend.common.models.publication import Publication, NewPublication
from backend.common.repositories.publications_repo import publications_repo

router = APIRouter(
    prefix="/publications",
    tags=["Publications"],
)


@router.get("/", response_model=list[Publication])
async def get_publications(session: AsyncSession = Depends(get_session)):
    return await publications_repo.get_all(session)


@router.put("/", response_model=Publication)
async def create_publication(
    new_publication: NewPublication, session: AsyncSession = Depends(get_session)
):
    return await publications_repo.create(session, new_publication)
