from backend.common.core.enums import UserRole
from backend.common.models.base import OrgModel, NewOrgModel
from backend.common.models.organization import Organization


class NewUser(NewOrgModel):
    given_name: str
    family_name: str
    auth_id: str
    email: str
    verified: bool = False
    roles: list[UserRole] = []


class User(OrgModel, NewUser):
    org: Organization

    class Config:
        orm_mode = True
