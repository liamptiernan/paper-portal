from backend.common.core.enums import UserRole
from backend.common.models.base import OrgModel, NewOrgModel


class NewUserInvite(NewOrgModel):
    target_email: str
    target_roles: list[UserRole] = []
    accepted: bool = False


class UserInvite(OrgModel, NewUserInvite):
    class Config:
        orm_mode = True
