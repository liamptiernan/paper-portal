from backend.common.db.models import Publication
from backend.common.models.publication import Publication as AppPublication
from backend.common.repositories.base_repo import BaseRepo


class PublicationsRepo(BaseRepo[Publication, AppPublication]):
    ...


publications_repo = PublicationsRepo(Publication, AppPublication)
