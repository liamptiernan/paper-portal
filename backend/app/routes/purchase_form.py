from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.init import get_session
from backend.common.models.ad_offering import PublicAdOffering
from backend.common.repositories.ad_offerings_repo import ad_offerings_repo

router = APIRouter(
    prefix="/purchase-form",
    tags=["Purchase"],
)


@router.get("/config/{publication_id}", response_model=list[PublicAdOffering])
async def get_form_config(
    publication_id: int,
    session: AsyncSession = Depends(get_session),
):
    return await ad_offerings_repo.get_all_public_for_publication(
        publication_id, session
    )
