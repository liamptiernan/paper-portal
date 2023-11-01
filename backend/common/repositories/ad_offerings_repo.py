from backend.common.db.models import AdOffering
from backend.common.models.ad_offering import AdOffering as AppAdOffering
from backend.common.repositories.base_repo import BaseRepo


class AdOfferingsRepo(BaseRepo[AdOffering, AppAdOffering]):
    ...


ad_offerings_repo = AdOfferingsRepo(AdOffering, AppAdOffering)
