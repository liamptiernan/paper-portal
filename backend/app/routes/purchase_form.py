from fastapi import APIRouter, Depends, UploadFile, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.init import get_session
from backend.common.models.ad_offering import PublicAdOffering
from backend.common.repositories.ad_offerings_repo import ad_offerings_repo
from backend.common.storage.client import LogoClient
from backend.common.storage.utils import get_key

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
    try:
        relative_key = get_key(logo.file)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail=str(e)
        )
    logo_client.upload_file_obj(file=logo.file, relative_key=relative_key)
    return relative_key
    # TODO: add this endpoint to the front end and test this

    # return the checksum
    # maybe some cleanup if this is ultimately associated with an object?
