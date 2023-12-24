from backend.common.core.enums import UserRole
from backend.common.models.base import OrgModel, NewOrgModel


class NewUserInvite(NewOrgModel):
    target_email: str
    target_roles: list[UserRole] = []
    accepted: bool = False
    declined: bool = False


class UserInvite(OrgModel, NewUserInvite):
    org_name: str

    class Config:
        orm_mode = True
