from backend.common.models.base import OrgModel, NewOrgModel
from backend.common.models.publication import Publication


class NewAdOffering(NewOrgModel):
    name: str
    publication_id: int
    impact_score: float = 1
    size: str = "1/4 Page"
    page_start: int = 1
    page_end: int | None = None
    color: bool = False


class AdOffering(NewAdOffering, OrgModel):
    publication: Publication

    class Config:
        orm_mode = True
