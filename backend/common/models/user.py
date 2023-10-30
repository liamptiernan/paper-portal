from pydantic import BaseModel

from backend.common.core.enums import Roles
from backend.common.models.base import AppModel


class NewUser(BaseModel):
    full_name: str
    email: str
    role: Roles | None = None


class User(NewUser, AppModel):
    class Config:
        orm_mode = True
