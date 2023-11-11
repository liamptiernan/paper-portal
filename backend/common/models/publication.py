from backend.common.models.base import AppModel, NewAppModel, OrgModel, NewOrgModel


class NewPublicationRegion(NewAppModel):
    zip_code: str
    reach: int | None = None


class PublicationRegion(NewPublicationRegion, AppModel):
    publication_id: int | None = None

    class Config:
        orm_mode = True


class NewPublication(NewOrgModel):
    name: str
    description: str | None = None
    format: str = "print"
    location: str | None = None
    distribution_unit: str = "individuals"
    estimated_reach: int = 0
    region_type: str = "regions"
    distribution_radius: int = 0
    regions: list[PublicationRegion] = []


class Publication(NewPublication, OrgModel):
    class Config:
        orm_mode = True
