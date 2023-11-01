from backend.common.models.base import OrgModel, NewOrgModel


class NewPublication(NewOrgModel):
    name: str
    estimated_reach: int | None = None
    format: str | None = None


class Publication(NewPublication, OrgModel):
    class Config:
        orm_mode = True
