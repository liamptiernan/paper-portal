from pydantic import BaseModel
from backend.common.models.base import AppModel


class NewPublication(BaseModel):
    name: str
    estimated_reach: int
    format: str


class Publication(NewPublication, AppModel):
    class Config:
        orm_mode = True
