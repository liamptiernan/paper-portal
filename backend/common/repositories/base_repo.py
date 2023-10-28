from typing import Generic, TypeVar

from pydantic import BaseModel
from sqlalchemy import Select, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.init import Base
from backend.common.models.base import AppModel, OwnedModel

TDBModel = TypeVar("TDBModel", bound=Base)
TAppModel = TypeVar("TAppModel", bound=AppModel)
TOwnerModel = TypeVar("TOwnerModel", bound=OwnedModel)


class RepoException(Exception):
    pass


class RepoAuthException(RepoException):
    pass


class BaseRepo(Generic[TDBModel, TAppModel]):
    # TODO: Add User to everything for permissions
    def __init__(self, db_model: type[TDBModel], app_model: type[TAppModel]) -> None:
        self.db_model = db_model
        self.app_model = app_model

    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: TDBModel,
    ) -> TAppModel:
        return self.app_model(**db_model.__dict__)

    async def app_to_db(
        self,
        session: AsyncSession,
        app_model: BaseModel,
    ) -> TDBModel:
        return self.db_model(**app_model.dict())

    async def new_to_db(
        self,
        session,
        new_model: BaseModel,
    ) -> TDBModel:
        return await self.app_to_db(
            session,
            new_model,
        )

    async def auth_select(self, session: AsyncSession, query: Select[tuple[TDBModel]]):
        return query

    async def auth_delete(self, session: AsyncSession, query: Select[tuple[TDBModel]]):
        return await self.auth_select(session, query)

    async def auth_create(
        self, session: AsyncSession, new_model: BaseModel
    ) -> BaseModel:
        return new_model

    async def auth_update(self, session: AsyncSession, updates: TAppModel) -> TAppModel:
        return updates

    def select_by_id(self, id: int) -> Select[tuple[TDBModel]]:
        return select(self.db_model).where(self.db_model.id == id)

    async def get(self, session: AsyncSession, id: int) -> TAppModel | None:
        query = await self.auth_select(session, self.select_by_id(id))
        model = (await session.execute(query)).scalar_one_or_none()
        if model:
            return await self.db_to_app(session, model)
        return None

    async def create(self, session: AsyncSession, new_app: BaseModel) -> TAppModel:
        new_app = await self.auth_create(session, new_app)
        model = await self.new_to_db(session, new_app)
        session.add(model)
        await session.commit()
        await session.refresh(model)
        return await self.db_to_app(session, model)

    async def update(self, session: AsyncSession, updates: TAppModel) -> TAppModel:
        updates = await self.auth_update(session, updates)
        model = await self.app_to_db(session, updates)
        model = await session.merge(model)
        await session.commit()
        await session.refresh(model)
        return await self.db_to_app(session, model)

    async def delete(self, session: AsyncSession, id: int) -> TAppModel | None:
        query = await self.auth_delete(session, self.select_by_id(id))
        model = (await session.execute(query)).scalar_one_or_none()
        if model:
            await session.delete(model)
            await session.commit()
            return await self.db_to_app(session, model)

    async def get_all(self, session: AsyncSession) -> list[TAppModel]:
        query = await self.auth_select(session, select(self.db_model))
        return [
            await self.db_to_app(session, model.t[0])
            for model in await session.execute(query)
        ]


# class OwnerRepo(BaseRepo[TDBModel, TOwnerModel]):
#     """
#     The entity has a user_id field that grants full access to the entity to the user with that id.
#     Additionally users with a role can create, update, and delete entities.
#     Examples:
#     """

#     async def auth_select(
#         self, session: AsyncSession, user: User, query: Select | Update
#     ):
#         if user.role_enum_value and "Internal-User-Admin" not in user.role_enum_value:
#             return query.filter_by(user_id=user.id)
#         return query

#     async def auth_delete(
#         self, session: AsyncSession, user: User, query: Select[tuple[TDBModel]]
#     ) -> Select[tuple[TDBModel]]:
#         return query.filter_by(user_id=user.id)

#     async def auth_create(
#         self, session: AsyncSession, user: User, new_model: OwnedModel
#     ) -> BaseModel:
#         new_model.user_id = user.id
#         new_model.client_id = user.client_id
#         return new_model

#     async def auth_update(
#         self, session: AsyncSession, user: User, updates: TOwnerModel
#     ) -> TOwnerModel:
#         existing = await super().get(session, updates.id, user)
#         if not existing:
#             raise RepoAuthException()

#         # Cannot change owner or client
#         updates.user_id = existing.user_id
#         updates.client_id = existing.client_id

#         return updates
