from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import AdPurchase
from backend.common.models.ad_purchase import AdPurchase as AppAdPurchase
from backend.common.models.ad_purchase import NewAdPurchase as AppNewAdPurchase
from backend.common.repositories.base_repo import OrgRepo


class AdPurchaseRepo(OrgRepo[AdPurchase, AppAdPurchase]):
    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: AdPurchase,
    ) -> AppAdPurchase:
        return AppAdPurchase(
            id=db_model.id,
            org_id=db_model.org_id,
            campaign_goal=db_model.campaign_goal,
            selected_ad_offering_id=db_model.selected_ad_offering_id,
            personal_ad=db_model.personal_ad,
            personal_ad_checksum=db_model.personal_ad_checksum,
            brand_colors=db_model.brand_colors,
            brand_logo_checksum=db_model.brand_logo_checksum,
            ad_phone_number=db_model.ad_phone_number,
            ad_email=db_model.ad_email,
            ad_website=db_model.ad_website,
            provided_copy=db_model.provided_copy,
            target_section=db_model.target_section,
            contact_name=db_model.contact_name,
            contact_phone=db_model.contact_phone,
            contact_address_1=db_model.contact_address_1,
            contact_address_2=db_model.contact_address_2,
            contact_city=db_model.contact_city,
            contact_state=db_model.contact_state,
            contact_zip=db_model.contact_zip,
            billing_name=db_model.billing_name,
            billing_phone=db_model.billing_phone,
            billing_address_1=db_model.billing_address_1,
            billing_address_2=db_model.billing_address_2,
            billing_city=db_model.billing_city,
            billing_state=db_model.billing_state,
            billing_zip=db_model.billing_zip,
            status=db_model.status,
        )

    async def app_to_db(
        self,
        session: AsyncSession,
        app_model: AppAdPurchase,
    ) -> AdPurchase:
        return AdPurchase(
            id=app_model.id,
            org_id=app_model.org_id,
            campaign_goal=app_model.campaign_goal,
            selected_ad_offering_id=app_model.selected_ad_offering_id,
            personal_ad=app_model.personal_ad,
            personal_ad_checksum=app_model.personal_ad_checksum,
            brand_colors=app_model.brand_colors,
            brand_logo_checksum=app_model.brand_logo_checksum,
            ad_phone_number=app_model.ad_phone_number,
            ad_email=app_model.ad_email,
            ad_website=app_model.ad_website,
            provided_copy=app_model.provided_copy,
            target_section=app_model.target_section,
            contact_name=app_model.contact_name,
            contact_phone=app_model.contact_phone,
            contact_address_1=app_model.contact_address_1,
            contact_address_2=app_model.contact_address_2,
            contact_city=app_model.contact_city,
            contact_state=app_model.contact_state,
            contact_zip=app_model.contact_zip,
            billing_name=app_model.billing_name,
            billing_phone=app_model.billing_phone,
            billing_address_1=app_model.billing_address_1,
            billing_address_2=app_model.billing_address_2,
            billing_city=app_model.billing_city,
            billing_state=app_model.billing_state,
            billing_zip=app_model.billing_zip,
            status=app_model.status,
        )

    async def new_to_db(
        self,
        session: AsyncSession,
        app_model: AppNewAdPurchase,
    ) -> AdPurchase:
        return AdPurchase(
            id=app_model.id,
            org_id=app_model.org_id,
            campaign_goal=app_model.campaign_goal,
            selected_ad_offering_id=app_model.selected_ad_offering_id,
            personal_ad=app_model.personal_ad,
            personal_ad_checksum=app_model.personal_ad_checksum,
            brand_colors=app_model.brand_colors,
            brand_logo_checksum=app_model.brand_logo_checksum,
            ad_phone_number=app_model.ad_phone_number,
            ad_email=app_model.ad_email,
            ad_website=app_model.ad_website,
            provided_copy=app_model.provided_copy,
            target_section=app_model.target_section,
            contact_name=app_model.contact_name,
            contact_phone=app_model.contact_phone,
            contact_address_1=app_model.contact_address_1,
            contact_address_2=app_model.contact_address_2,
            contact_city=app_model.contact_city,
            contact_state=app_model.contact_state,
            contact_zip=app_model.contact_zip,
            billing_name=app_model.billing_name,
            billing_phone=app_model.billing_phone,
            billing_address_1=app_model.billing_address_1,
            billing_address_2=app_model.billing_address_2,
            billing_city=app_model.billing_city,
            billing_state=app_model.billing_state,
            billing_zip=app_model.billing_zip,
            status="PENDING",
        )

    async def create(
        self, session: AsyncSession, new_purchase: AppNewAdPurchase
    ) -> AppAdPurchase:
        model = await self.new_to_db(session, new_purchase)
        session.add(model)
        await session.commit()
        await session.refresh(model)
        return await self.db_to_app(session, model)


ad_purchase_repo = AdPurchaseRepo(AdPurchase, AppAdPurchase)
