from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.routes.ad_offerings import AdOfferingsTableResponse
from backend.app.utils.user import UserWithRole
from backend.common.core.enums import UserRole
from backend.common.db.init import get_session
from backend.common.models.publication import NewPublication, Publication
from backend.common.models.ad_offering import NewAdOffering, AdOffering
from backend.common.models.user import User
from backend.common.repositories.publications_repo import publications_repo
from backend.common.repositories.ad_offerings_repo import ad_offerings_repo

router = APIRouter(
    prefix="/publications",
    tags=["Publications"],
)

superuser = UserWithRole(UserRole.SUPERUSER)


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
    publication = await publications_repo.get(session, id, user)
    if publication is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Publication not found"
        )
    return publication


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


@router.delete("/{id}", response_model=None)
async def delete_publication(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await publications_repo.delete(session, user, id)


# Ad Offerings


@router.get("/offerings/{offering_id}", response_model=AdOffering)
async def get_ad_offering(
    offering_id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    ad_offering = await ad_offerings_repo.get(session, offering_id, user)
    if ad_offering is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Ad offering not found"
        )
    return ad_offering


@router.delete("/offerings/{id}", response_model=None)
async def delete_ad_offering(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await ad_offerings_repo.delete(session, user, id)


@router.post("/offerings/reorder", response_model=list[AdOffering])
async def reorder_ad_offering(
    order: list[int],
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await ad_offerings_repo.reorder_and_get_ad_offerings(order, session, user)


@router.post("/offerings/", response_model=AdOffering)
async def update_ad_offering(
    offering_updates: AdOffering,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    return await ad_offerings_repo.update(session, user, offering_updates)


@router.get("/{id}/offerings/", response_model=AdOfferingsTableResponse)
async def get_publication_ad_offerings(
    id: int,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    ad_offerings = await ad_offerings_repo.get_all_for_publication(id, session, user)
    return AdOfferingsTableResponse(data=ad_offerings, count=len(ad_offerings))


@router.put(
    "/{publication_id}/offerings/",
    status_code=status.HTTP_201_CREATED,
    response_model=AdOffering,
)
async def create_publication_ad_offering(
    publication_id: int,
    new_ad_offering: NewAdOffering,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(superuser),
):
    new_ad_offering.publication_id = publication_id
    return await ad_offerings_repo.create(session, user, new_ad_offering)
