from pydantic import BaseModel

from backend.common.core.enums import Roles
from backend.common.models.base import AppModel
from backend.common.models.organization import Organization


class NewUser(BaseModel):
    full_name: str
    email: str
    role: Roles | None = None
    org_id: int


class User(NewUser, AppModel):
    org: Organization

    class Config:
        orm_mode = True
