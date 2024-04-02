from sqlalchemy import Select, select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.common.db.models import Organization, Publication


async def purchaseFormConfigQuery(session: AsyncSession, org_id: int) -> Select:
    query = (
        select(
            Organization.id,
            Publication.id,
            Publication.name,
            Publication.description,
            Publication.location,
            Publication.estimated_reach,
            Publication.distribution_unit,
        )
        .join(Publication)
        .where(Organization.id == org_id)
    )
    res = (await session.execute(query)).scalar_one_or_none()
    return res
    # turn these into models and return


def getPublicationConfig(org_id: int):
    base_query = (
        select(
            Organization.id,
            Publication.id,
            Publication.name,
            Publication.description,
            Publication.location,
            Publication.estimated_reach,
            Publication.distribution_unit,
        )
        .join(Publication)
        .where(Organization.id == org_id)
    )
    return base_query
