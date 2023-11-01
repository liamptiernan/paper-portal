from pydantic import BaseModel


class AppModel(BaseModel):
    id: int


class NewAppModel(BaseModel):
    id: int | None = None


class OwnedModel(AppModel):
    user_id: int
    org_id: int


class NewOwnedModel(NewAppModel):
    user_id: int | None = None
    org_id: int | None = None


class OrgModel(AppModel):
    org_id: int


class NewOrgModel(NewAppModel):
    org_id: int | None = None
