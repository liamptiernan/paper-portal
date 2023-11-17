from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.utils.user import UserWithRole
from backend.common.core.enums import Roles
from backend.common.db.init import get_session
from backend.common.models.ad_offering import AdOffering, NewAdOffering
from backend.common.models.user import User
from backend.common.repositories.ad_offerings_repo import ad_offerings_repo

router = APIRouter(
    prefix="/ad-offerings",
    tags=["AdOfferings"],
)

superuser = UserWithRole(Roles.SUPERUSER)


class AdOfferingsTableResponse(BaseModel):
    data: list[AdOffering]
    count: int


@router.get("/", response_model=AdOfferingsTableResponse)
async def get_all_ad_offerings(
    session: AsyncSession = Depends(get_session), user: User = Depends(superuser)
):
    publications = await ad_offerings_repo.get_all(session, user)
    return AdOfferingsTableResponse(data=publications, count=len(publications))


@router.get("/{id}", response_model=AdOffering)
async def get_ad_offering(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    publication = await ad_offerings_repo.get(session, id, user)
    if publication is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Publication not found"
        )
    return publication


@router.post("/", response_model=AdOffering)
async def update_ad_offering(
    pub_updates: AdOffering,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await ad_offerings_repo.update(session, user, pub_updates)


@router.put("/", response_model=AdOffering, status_code=status.HTTP_201_CREATED)
async def create_ad_offering(
    new_publication: NewAdOffering,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await ad_offerings_repo.create(session, user, new_publication)


@router.delete("/{id}", response_model=None)
async def delete_ad_offering(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await ad_offerings_repo.delete(session, user, id)
