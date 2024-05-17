from typing import Literal
from backend.common.models.ad_offering import PublicAdOffering
from backend.common.models.base import OrgModel, NewOrgModel
from backend.common.core.enums import PersonalAdSelection, States


class NewAdPurchase(NewOrgModel):
    campaign_goal: list[str]
    selected_ad_offering_id: int
    selected_ad_offering: PublicAdOffering | None = None
    personal_ad: PersonalAdSelection
    personal_ad_checksum: str
    brand_colors: list[str]
    brand_logo_checksum: str | None = None
    ad_phone_number: str | None = None
    ad_email: str | None = None
    ad_website: str | None = None
    provided_copy: str | None = None
    target_section: str | None = None
    contact_name: str
    contact_phone: str
    contact_address_1: str
    contact_address_2: str | None = None
    contact_city: str
    contact_state: States
    contact_zip: int
    billing_name: str
    billing_phone: str
    billing_address_1: str
    billing_address_2: str | None = None
    billing_city: str
    billing_state: States
    billing_zip: int


class AdPurchase(NewAdPurchase, OrgModel):
    status: Literal["PENDING", "PURCHASED", "FULFILLED"]

    class Config:
        orm_mode = True
