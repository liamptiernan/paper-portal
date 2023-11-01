from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.common.core.enums import Roles
from backend.common.db.init import Base


class Organization(Base):
    __tablename__ = "organization"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str]
    email: Mapped[str]
    role: Mapped[Roles] = mapped_column(nullable=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id])


class Publication(Base):
    __tablename__ = "publication"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    estimated_reach: Mapped[int] = mapped_column(nullable=True)
    format: Mapped[str] = mapped_column(nullable=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id])


class AdOffering(Base):
    __tablename__ = "ad_offering"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    publication_id: Mapped[int] = mapped_column(
        ForeignKey("publication.id"), nullable=False
    )
    publication: Mapped[Publication] = relationship(foreign_keys=[publication_id])
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id])
