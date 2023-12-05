from pydantic import BaseModel

from backend.common.core.enums import UserRole
from backend.common.models.base import AppModel
from backend.common.models.organization import Organization


class NewUser(BaseModel):
    given_name: str
    family_name: str
    auth_id: str
    email: str
    roles: list[UserRole] = []
    org_id: int


class User(NewUser, AppModel):
    org: Organization

    class Config:
        orm_mode = True
