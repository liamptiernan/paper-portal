from backend.common.models.base import AppModel, NewAppModel, OrgModel, NewOrgModel


class NewPublicationRegion(NewAppModel):
    publication_id: int
    zip_code: str
    reach: int | None = None


class PublicationRegion(NewPublicationRegion, AppModel):
    class Config:
        orm_mode = True


class NewPublication(NewOrgModel):
    name: str
    estimated_reach: int | None = None
    format: str | None = None
    regions: list[PublicationRegion] = []


class Publication(NewPublication, OrgModel):
    class Config:
        orm_mode = True
