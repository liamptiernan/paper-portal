"""add publication regions

Revision ID: deef52d61863
Revises: f24044e290b1
Create Date: 2023-11-03 07:59:45.412637

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "deef52d61863"
down_revision: Union[str, None] = "f24044e290b1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "publication_region",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("publication_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("zip_code", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column("reach", sa.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(
            ["publication_id"],
            ["publication.id"],
        ),
        sa.PrimaryKeyConstraint("id", name="publication_region_pkey"),
    )


def downgrade() -> None:
    pass
