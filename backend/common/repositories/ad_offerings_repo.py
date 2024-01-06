from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import AdOffering
from backend.common.models.ad_offering import AdOffering as AppAdOffering
from backend.common.models.ad_offering import NewAdOffering as AppNewAdOffering
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
            price=db_model.price,
            index=db_model.index,
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
            price=app_model.price,
            index=app_model.index,
        )

    async def get_all_for_publication(
        self, id: int, session: AsyncSession, user: AppUser
    ) -> list[AppAdOffering]:
        base_query = (
            select(AdOffering)
            .where(AdOffering.publication_id == id)
            .order_by(AdOffering.index.desc())
        )
        query = await self.auth_select(session, user, base_query)
        return [
            await self.db_to_app(session, model.t[0])
            for model in (await session.execute(query)).unique()
        ]

    async def reorder_ad_offerings(
        self, new_order: list[int], session: AsyncSession, user: AppUser
    ) -> None:
        query = select(AdOffering.id).where(AdOffering.id.in_(new_order))
        clean_order = (
            await session.scalars(await self.auth_select(session, user, query))
        ).all()
        if len(clean_order) != len(new_order):
            raise Exception("Order lengths differ")

        if offering_count := len(new_order) - 1:
            step = 0.9 / offering_count
        else:
            step = 0.9
        await session.execute(
            update(AdOffering),
            [
                {
                    "id": id,
                    "index": index,
                    "impact_score": round(0.1 + (index * step), 5),
                }
                for index, id in enumerate(new_order)
            ],
        )
        await session.commit()

    async def reorder_and_get_ad_offerings(
        self, new_order: list[int], session: AsyncSession, user: AppUser
    ) -> list[AppAdOffering]:
        await self.reorder_ad_offerings(new_order, session, user)
        res_query = await self.auth_select(
            session,
            user,
            select(AdOffering)
            .where(AdOffering.id.in_(new_order))
            .order_by(AdOffering.index.desc()),
        )
        return [
            await self.db_to_app(session, model.t[0])
            for model in (await session.execute(res_query)).unique()
        ]

    async def create(
        self, session: AsyncSession, user: AppUser, new_offering: AppNewAdOffering
    ) -> AppAdOffering:
        created_offering = await super().create(session, user, new_offering)
        publication_offerings = await self.get_all_for_publication(
            created_offering.publication_id, session, user
        )
        new_order = [offering.id for offering in reversed(publication_offerings)]
        await self.reorder_ad_offerings(new_order, session, user)
        return created_offering

    async def delete(self, session: AsyncSession, user: AppUser, id: int) -> None:
        target_ad_offering = await self.get(session, id, user)
        if target_ad_offering is None:
            raise Exception("Offering to delete not found")
        await super().delete(session, user, id)
        publication_offerings = await self.get_all_for_publication(
            target_ad_offering.publication_id, session, user
        )
        new_order = [offering.id for offering in reversed(publication_offerings)]
        print(len(new_order))
        await self.reorder_ad_offerings(new_order, session, user)


ad_offerings_repo = AdOfferingsRepo(AdOffering, AppAdOffering)
