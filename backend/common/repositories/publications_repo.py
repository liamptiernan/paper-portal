from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import Publication, PublicationRegion
from backend.common.models.publication import Publication as AppPublication
from backend.common.models.publication import PublicationRegion as AppPublicationRegion
from backend.common.repositories.base_repo import OrgRepo


class PublicationsRepo(OrgRepo[Publication, AppPublication]):
    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: Publication,
    ) -> AppPublication:
        return AppPublication(
            id=db_model.id,
            org_id=db_model.org_id,
            name=db_model.name,
            description=db_model.description,
            format=db_model.format,
            location=db_model.location,
            distribution_unit=db_model.distribution_unit,
            estimated_reach=db_model.estimated_reach,
            region_type=db_model.region_type,
            distribution_radius=db_model.distribution_radius,
            regions=[
                AppPublicationRegion(**region.__dict__) for region in db_model.regions
            ],
            sections=db_model.sections,
        )

    async def app_to_db(
        self,
        session: AsyncSession,
        app_model: AppPublication,
    ) -> Publication:
        return Publication(
            id=app_model.id,
            org_id=app_model.org_id,
            name=app_model.name,
            description=app_model.description,
            format=app_model.format,
            location=app_model.location,
            distribution_unit=app_model.distribution_unit,
            estimated_reach=app_model.estimated_reach,
            region_type=app_model.region_type,
            distribution_radius=app_model.distribution_radius,
            regions=[
                PublicationRegion(**region.model_dump()) for region in app_model.regions
            ],
            sections=app_model.sections,
        )


publications_repo = PublicationsRepo(Publication, AppPublication)
