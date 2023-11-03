from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.models import Publication, PublicationRegion
from backend.common.models.publication import Publication as AppPublication
from backend.common.models.publication import PublicationRegion as AppPublicationRegion
from backend.common.repositories.base_repo import BaseRepo


class PublicationsRepo(BaseRepo[Publication, AppPublication]):
    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: Publication,
    ) -> AppPublication:
        return AppPublication(
            id=db_model.id,
            org_id=db_model.org_id,
            name=db_model.name,
            estimated_reach=db_model.estimated_reach,
            format=db_model.format,
            regions=[
                AppPublicationRegion(**region.__dict__) for region in db_model.regions
            ],
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
            estimated_reach=app_model.estimated_reach,
            format=app_model.format,
            regions=[
                PublicationRegion(**region.model_dump()) for region in app_model.regions
            ],
        )


publications_repo = PublicationsRepo(Publication, AppPublication)
