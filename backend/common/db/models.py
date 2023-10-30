from sqlalchemy.orm import Mapped, mapped_column

from backend.common.core.enums import Roles
from backend.common.db.init import Base


class Publication(Base):
    __tablename__ = "publication"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    estimated_reach: Mapped[int] = mapped_column(nullable=True)
    format: Mapped[str] = mapped_column(nullable=True)


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str]
    email: Mapped[str]
    role: Mapped[Roles] = mapped_column(nullable=True)
