from typing import Any, AsyncGenerator

from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import declarative_base

from backend.common.core.settings import settings

engine = create_async_engine(settings.db_url)

SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)


async def get_session() -> AsyncGenerator[AsyncSession, Any]:
    async with SessionLocal() as session:
        yield session


metadata = MetaData()
Base = declarative_base(metadata=metadata)
