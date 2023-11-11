from backend.common.models.base import OrgModel, NewOrgModel
from backend.common.models.publication import Publication


class NewAdOffering(NewOrgModel):
    name: str
    publication_id: int


class AdOffering(NewAdOffering, OrgModel):
    publication: Publication

    class Config:
        orm_mode = True


# TODO: Add repos and migrations
