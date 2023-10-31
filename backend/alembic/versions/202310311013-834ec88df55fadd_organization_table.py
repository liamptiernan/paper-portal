"""add organization table

Revision ID: 834ec88df55f
Revises: 769515ecc0f1
Create Date: 2023-10-31 10:13:29.859449

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

from backend.common.db.models import Organization


# revision identifiers, used by Alembic.
revision: str = "834ec88df55f"
down_revision: Union[str, None] = "769515ecc0f1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    org_table = op.create_table(
        "organization",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("name", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name="organization_pkey"),
    )
    root_org_update = sa.insert(org_table).values({"name": "_system_org"})

    op.execute(root_org_update)
    op.add_column(
        "user", sa.Column("org_id", sa.Integer(), nullable=False, server_default="1")
    )
    op.create_foreign_key("org_id_fk", "user", "organization", ["org_id"], ["id"])
    # op.alter_column("user", "org_id", server_default=None)


def downgrade() -> None:
    op.drop_table(Organization)
