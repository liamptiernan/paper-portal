from typing import Generic, TypeVar

from pydantic import BaseModel
from sqlalchemy import Select, select, Update
from sqlalchemy.ext.asyncio import AsyncSession

from backend.common.db.init import Base
from backend.common.models.base import AppModel, OwnedModel, OrgModel
from backend.common.models.user import User as AppUser

TDBModel = TypeVar("TDBModel", bound=Base)
TAppModel = TypeVar("TAppModel", bound=AppModel)
TOwnerModel = TypeVar("TOwnerModel", bound=OwnedModel)
TOrgModel = TypeVar("TOrgModel", bound=OrgModel)


class RepoException(Exception):
    pass


class RepoAuthException(RepoException):
    pass


class BaseRepo(Generic[TDBModel, TAppModel]):
    def __init__(self, db_model: type[TDBModel], app_model: type[TAppModel]) -> None:
        self.db_model = db_model
        self.app_model = app_model

    async def db_to_app(
        self,
        session: AsyncSession,
        db_model: TDBModel,
    ) -> TAppModel:
        print(db_model)
        return self.app_model(**db_model.__dict__)

    async def app_to_db(
        self,
        session: AsyncSession,
        app_model: BaseModel,
    ) -> TDBModel:
        return self.db_model(**app_model.model_dump())

    async def new_to_db(
        self,
        session,
        new_model: BaseModel,
    ) -> TDBModel:
        return await self.app_to_db(
            session,
            new_model,
        )

    async def auth_select(
        self, session: AsyncSession, user: AppUser, query: Select[tuple[TDBModel]]
    ):
        return query

    async def auth_delete(
        self, session: AsyncSession, user: AppUser, query: Select[tuple[TDBModel]]
    ):
        return await self.auth_select(session, user, query)

    async def auth_create(
        self, session: AsyncSession, user: AppUser, new_model: BaseModel
    ) -> BaseModel:
        return new_model

    async def auth_update(
        self, session: AsyncSession, user: AppUser, updates: TAppModel
    ) -> TAppModel:
        return updates

    def select_by_id(self, id: int) -> Select[tuple[TDBModel]]:
        return select(self.db_model).where(self.db_model.id == id)

    async def get(
        self, session: AsyncSession, id: int, user: AppUser
    ) -> TAppModel | None:
        query = await self.auth_select(session, user, self.select_by_id(id))
        model = (await session.execute(query)).unique().scalar_one_or_none()
        if model:
            return await self.db_to_app(session, model)
        return None

    async def create(
        self, session: AsyncSession, user: AppUser, new_app: BaseModel
    ) -> TAppModel:
        new_app = await self.auth_create(session, user, new_app)
        model = await self.new_to_db(session, new_app)
        session.add(model)
        await session.commit()
        await session.refresh(model)
        return await self.db_to_app(session, model)

    async def update(
        self, session: AsyncSession, user: AppUser, updates: TAppModel
    ) -> TAppModel:
        updates = await self.auth_update(session, user, updates)
        model = await self.app_to_db(session, updates)
        model = await session.merge(model)
        await session.commit()
        await session.refresh(model)
        return await self.db_to_app(session, model)

    async def delete(
        self, session: AsyncSession, user: AppUser, id: int
    ) -> TAppModel | None:
        query = await self.auth_delete(session, user, self.select_by_id(id))
        model = (await session.execute(query)).scalar_one_or_none()
        if model:
            await session.delete(model)
            await session.commit()
            return await self.db_to_app(session, model)

    async def get_all(
        self,
        session: AsyncSession,
        user: AppUser,
    ) -> list[TAppModel]:
        query = await self.auth_select(session, user, select(self.db_model))
        return [
            await self.db_to_app(session, model.t[0])
            for model in (await session.execute(query)).unique()
        ]


class OrgRepo(BaseRepo[TDBModel, TOrgModel]):
    """
    The entity has a org_id field that grants full access to any user part of that org.
    Additionally users with a role can create, update, and delete entities.
    Examples:
    """

    async def auth_select(
        self, session: AsyncSession, user: AppUser, query: Select | Update
    ):
        # if user.role == SuperUser, bypass
        return query.filter_by(org_id=user.org_id)

    async def auth_delete(
        self, session: AsyncSession, user: AppUser, query: Select[tuple[TDBModel]]
    ) -> Select[tuple[TDBModel]]:
        return query.filter_by(org_id=user.org_id)

    async def auth_create(
        self, session: AsyncSession, user: AppUser, new_model: OwnedModel
    ) -> BaseModel:
        new_model.org_id = user.org_id
        return new_model

    async def auth_update(
        self, session: AsyncSession, user: AppUser, updates: TOwnerModel
    ) -> TOwnerModel:
        existing = await super().get(session, updates.id, user)
        if not existing:
            raise RepoAuthException()

        # Cannot change owner or client
        updates.org_id = existing.org_id

        return updates


class OwnerRepo(BaseRepo[TDBModel, TOwnerModel]):
    """
    The entity has a user_id field that grants full access to the entity to the user with that id.
    Additionally users with a role can create, update, and delete entities.
    Examples:
    """

    async def auth_select(
        self, session: AsyncSession, user: AppUser, query: Select | Update
    ):
        # if user.role == SuperUser, bypass
        return query.filter_by(user_id=user.id)

    async def auth_delete(
        self, session: AsyncSession, user: AppUser, query: Select[tuple[TDBModel]]
    ) -> Select[tuple[TDBModel]]:
        return query.filter_by(user_id=user.id)

    async def auth_create(
        self, session: AsyncSession, user: AppUser, new_model: OwnedModel
    ) -> BaseModel:
        new_model.user_id = user.id
        new_model.org_id = user.org_id
        return new_model

    async def auth_update(
        self, session: AsyncSession, user: AppUser, updates: TOwnerModel
    ) -> TOwnerModel:
        existing = await super().get(session, updates.id, user)
        if not existing:
            raise RepoAuthException()

        # Cannot change owner or client
        updates.user_id = existing.user_id
        updates.org_id = existing.org_id

        return updates
