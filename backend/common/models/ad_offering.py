from backend.common.models.base import OrgModel, NewOrgModel, AppModel
from backend.common.models.publication import Publication


class NewAdOffering(NewOrgModel):
    name: str
    publication_id: int
    impact_score: float = 1
    size: str = "1/4 Page"
    x_dimension: int = 0
    y_dimension: int = 0
    page_start: int = 1
    page_end: int | None = None
    color: bool = False
    price: float = 100
    index: int = 0


class AdOffering(NewAdOffering, OrgModel):
    publication: Publication

    class Config:
        orm_mode = True


class PublicAdOffering(AppModel):
    name: str
    impact_score: float = 1
    size: str = "1/4 Page"
    x_dimension: int
    y_dimension: int
    page_start: int = 1
    page_end: int | None = None
    color: bool = False
    price: float = 100
    index: int = 0
