from typing import Literal
from sqlalchemy import ARRAY, Column, ForeignKey, VARCHAR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.common.core.enums import PersonalAdSelection, States, UserRole
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


class AdPurchase(Base):
    __tablename__ = "ad_purchase"

    id: Mapped[int] = mapped_column(primary_key=True)
    campaign_goal: Mapped[list[str]] = Column(ARRAY(VARCHAR))  # type: ignore
    selected_ad_offering_id: Mapped[int] = mapped_column(
        ForeignKey("ad_offering.id"), nullable=False
    )
    selected_ad_offering: Mapped[AdOffering] = relationship(
        foreign_keys=[selected_ad_offering_id]
    )
    personal_ad: Mapped[PersonalAdSelection]
    personal_ad_checksum: Mapped[str]
    brand_colors: Mapped[list[str]] = Column(ARRAY(VARCHAR))  # type: ignore
    brand_logo_checksum: Mapped[str] = mapped_column(nullable=True)
    ad_phone_number: Mapped[str] = mapped_column(nullable=True)
    ad_email: Mapped[str] = mapped_column(nullable=True)
    ad_website: Mapped[str] = mapped_column(nullable=True)
    provided_copy: Mapped[str] = mapped_column(nullable=True)
    target_section: Mapped[str] = mapped_column(nullable=True)
    contact_name: Mapped[str]
    contact_phone: Mapped[str]
    contact_address_1: Mapped[str]
    contact_address_2: Mapped[str] = mapped_column(nullable=True)
    contact_city: Mapped[str]
    contact_state: Mapped[States]
    contact_zip: Mapped[int]
    billing_name: Mapped[str]
    billing_phone: Mapped[str]
    billing_address_1: Mapped[str]
    billing_address_2: Mapped[str] = mapped_column(nullable=True)
    billing_city: Mapped[str]
    billing_state: Mapped[States]
    billing_zip: Mapped[int]
    org_id: Mapped[int] = mapped_column(ForeignKey("organization.id"), nullable=False)
    org: Mapped[Organization] = relationship(foreign_keys=[org_id])
    status: Mapped[Literal["PENDING", "PURCHASED", "FULFILLED"]]
