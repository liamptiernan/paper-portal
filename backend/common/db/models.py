from backend.common.db.init import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Publication(Base):
    __tablename__ = "publication"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    estimated_reach: Mapped[int] = mapped_column(nullable=True)
    format: Mapped[str] = mapped_column(nullable=True)
