from sqlalchemy import ARRAY, Column, ForeignKey, VARCHAR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.common.core.enums import UserRole
from backend.common.db.init import Base


class Organization(Base):
    __tablename__ = "organization"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]


class UserInvite(Base):
    __tablename__ = "user_invite"
    id: Mapped[int] = mapped_column(primary_key=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    target_email: Mapped[str]
    target_roles: Mapped[list[UserRole]] = Column(ARRAY(VARCHAR))  # type: ignore
    accepted: Mapped[bool]
    declined: Mapped[bool]
    org: Mapped[Organization] = relationship(foreign_keys=[org_id], lazy="joined")


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    given_name: Mapped[str]
    family_name: Mapped[str]
    auth_id: Mapped[str]
    email: Mapped[str]
    verified: Mapped[bool]
    roles: Mapped[list[UserRole]] = Column(ARRAY(VARCHAR))  # type: ignore
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id], lazy="joined")


class PublicationRegion(Base):
    __tablename__ = "publication_region"
    id: Mapped[int] = mapped_column(primary_key=True)
    publication_id: Mapped[int] = mapped_column(
        ForeignKey("publication.id"), nullable=False
    )
    publication: Mapped["Publication"] = relationship(
        back_populates="regions", lazy="raise"
    )
    zip_code: Mapped[str]
    reach: Mapped[int] = mapped_column(nullable=True)


class Publication(Base):
    __tablename__ = "publication"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[str] = mapped_column(nullable=True)
    format: Mapped[str]
    location: Mapped[str] = mapped_column(nullable=True)
    distribution_unit: Mapped[str]
    estimated_reach: Mapped[int]
    region_type: Mapped[str]
    distribution_radius: Mapped[int]
    regions: Mapped[list[PublicationRegion]] = relationship(
        back_populates="publication", lazy="joined", cascade="all, delete-orphan"
    )
    sections: Mapped[list[str]] = Column(ARRAY(VARCHAR), nullable=False)  # type: ignore
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id])


class AdOffering(Base):
    __tablename__ = "ad_offering"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    impact_score: Mapped[float]
    size: Mapped[str]
    x_dimension: Mapped[int]
    y_dimension: Mapped[int]
    page_start: Mapped[int]
    page_end: Mapped[int] = mapped_column(nullable=True)
    color: Mapped[bool]
    price: Mapped[float]
    index: Mapped[int]
    publication_id: Mapped[int] = mapped_column(
        ForeignKey("publication.id"), nullable=False
    )
    publication: Mapped[Publication] = relationship(
        foreign_keys=[publication_id], lazy="joined"
    )
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id])
