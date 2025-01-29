from pydantic import BaseModel

from backend.common.models.base import AppModel


class NewOrganization(BaseModel):
    name: str


class Organization(NewOrganization, AppModel):
    class Config:
        orm_mode = True
