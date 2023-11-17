from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import AdOffering
from backend.common.models.ad_offering import AdOffering as AppAdOffering
from backend.common.models.publication import Publication as AppPublication
from backend.common.repositories.base_repo import OrgRepo
from backend.common.models.user import User as AppUser


class AdOfferingsRepo(OrgRepo[AdOffering, AppAdOffering]):
    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: AdOffering,
    ) -> AppAdOffering:
        return AppAdOffering(
            id=db_model.id,
            org_id=db_model.org_id,
            name=db_model.name,
            publication_id=db_model.publication_id,
            publication=AppPublication(
                **db_model.publication.__dict__
            ),  # TODO: we probably dont need this join by default
            impact_score=db_model.impact_score,
            size=db_model.size,
            page_start=db_model.page_start,
            page_end=db_model.page_end,
            color=db_model.color,
        )

    async def app_to_db(
        self,
        session: AsyncSession,
        app_model: AppAdOffering,
    ) -> AdOffering:
        return AdOffering(
            id=app_model.id,
            org_id=app_model.org_id,
            name=app_model.name,
            publication_id=app_model.publication_id,
            impact_score=app_model.impact_score,
            size=app_model.size,
            page_start=app_model.page_start,
            page_end=app_model.page_end,
            color=app_model.color,
        )

    async def get_all_for_publication(
        self, id: int, session: AsyncSession, user: AppUser
    ) -> list[AppAdOffering]:
        base_query = select(AdOffering).where(AdOffering.publication_id == id)
        query = await self.auth_select(session, user, base_query)
        return [
            await self.db_to_app(session, model.t[0])
            for model in (await session.execute(query)).unique()
        ]


ad_offerings_repo = AdOfferingsRepo(AdOffering, AppAdOffering)
