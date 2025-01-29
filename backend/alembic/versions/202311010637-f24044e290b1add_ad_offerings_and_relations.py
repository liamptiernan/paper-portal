"""add ad offerings and relations

Revision ID: f24044e290b1
Revises: 834ec88df55f
Create Date: 2023-11-01 06:37:15.996249

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "f24044e290b1"
down_revision: Union[str, None] = "834ec88df55f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# Create Adoffering
# foreign key from pub to org
def upgrade() -> None:
    op.create_table(
        "ad_offering",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("name", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column("publication_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("org_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(
            ["publication_id"],
            ["publication.id"],
        ),
        sa.ForeignKeyConstraint(
            ["org_id"],
            ["organization.id"],
        ),
        sa.PrimaryKeyConstraint("id", name="ad_offering_pkey"),
    )
    # root_org_update = sa.insert(org_table).values({"name": "_system_org"})
    op.add_column("publication", sa.Column("org_id", sa.Integer(), nullable=False))
    op.create_foreign_key(
        "org_id_fk", "publication", "organization", ["org_id"], ["id"]
    )


def downgrade() -> None:
    pass
