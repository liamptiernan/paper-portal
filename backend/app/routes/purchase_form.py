from fastapi import APIRouter, Depends, UploadFile, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
import stripe

from backend.common.db.init import get_session
from backend.common.models.ad_offering import PublicAdOffering
from backend.common.models.ad_purchase import AdPurchase
from backend.common.models.publication import PublicPublication
from backend.common.repositories.ad_offerings_repo import ad_offerings_repo
from backend.common.repositories.ad_purchases_repo import ad_purchase_repo
from backend.common.repositories.publications_repo import publications_repo
from backend.common.storage.client import AdClient, LogoClient
from backend.common.storage.utils import get_key

router = APIRouter(
    prefix="/purchase-form",
    tags=["Purchase"],
)


@router.get("/config/{publication_id}/publication", response_model=PublicPublication)
async def get_form_publication(
    publication_id: int,
    session: AsyncSession = Depends(get_session),
):
    publication = await publications_repo.get_public_publication(
        session, publication_id
    )
    if publication is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Publication not found"
        )
    return publication


@router.get("/config/{publication_id}/offerings", response_model=list[PublicAdOffering])
async def get_ad_offerings(
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


@router.post("/upload/ad", response_model=str)
async def upload_ad(ad: UploadFile) -> str:
    logo_client = AdClient()
    try:
        relative_key = get_key(ad.file)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail=str(e)
        )
    logo_client.upload_file_obj(file=ad.file, relative_key=relative_key)
    return relative_key
    # TODO:
    # maybe some cleanup if this is ultimately associated with an object?
    # throw away uploads if they aren't needed


@router.post("/submit", response_model=AdPurchase)
async def submit_purchase(
    new_ad_purchase: AdPurchase,
    session: AsyncSession = Depends(get_session),
) -> AdPurchase:
    return await ad_purchase_repo.create(session, new_ad_purchase)


stripe.api_key = "sk_test_51PF0P9K2QqtW2Jds8dO4Zg57etR2Xm2hg00mIUNUR5zt40PmzMPx3r11xYRvLWqiY9GU081ZnJgZAQUoTLna9bii00tHcZDoLH"  # noqa: E501


@router.post("/create-checkout-session", response_model=str | None)
async def create_checkout_session() -> str | None:
    product = stripe.Product.create(name="T-shirt")
    price = stripe.Price.create(
        unit_amount=2000,
        currency="usd",
        product=product.id,
    )
    session = stripe.checkout.Session.create(
        ui_mode="embedded",
        line_items=[
            {
                # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                "price": f"{price.id}",
                "quantity": 1,
            },
        ],  # todo
        mode="payment",
        return_url="http://localhost:5173/purchase/complete?session={CHECKOUT_SESSION_ID}",
    )

    return session.client_secret
