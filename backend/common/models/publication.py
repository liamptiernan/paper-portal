from pydantic import BaseModel
from backend.common.models.base import AppModel


class NewPublication(BaseModel):
    name: str
    estimated_reach: int | None = None
    format: str | None = None


class Publication(NewPublication, AppModel):
    class Config:
        orm_mode = True
