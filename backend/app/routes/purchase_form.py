from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.init import get_session
from backend.common.models.ad_offering import PublicAdOffering
from backend.common.repositories.ad_offerings_repo import ad_offerings_repo
from backend.common.storage.client import LogoClient
from backend.common.storage.utils import get_hash

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


@router.post("/upload/logo", response_model=str)
async def upload_logo(logo: UploadFile) -> str:
    logo_client = LogoClient()
    checksum = get_hash(logo.file.read())
    if not logo.filename:
        raise ValueError("No filename")
    logo_client.upload_file(file_name=logo.filename, relative_key=checksum)
    return checksum
    # return the checksum
    # maybe some cleanup if this is ultimately associated with an object?
