from pydantic import BaseModel


class AppModel(BaseModel):
    id: int


class NewAppModel(BaseModel):
    id: int | None = None


class OwnedModel(AppModel):
    user_id: int
    client_id: int


class NewOwnedModel(NewAppModel):
    user_id: int | None = None
    client_id: int | None = None
