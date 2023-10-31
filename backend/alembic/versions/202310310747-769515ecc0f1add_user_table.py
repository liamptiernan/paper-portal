"""Add user table

Revision ID: 769515ecc0f1
Revises: f8ac28872624
Create Date: 2023-10-31 07:47:06.708067

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

from backend.common.db.models import User


# revision identifiers, used by Alembic.
revision: str = "769515ecc0f1"
down_revision: Union[str, None] = "f8ac28872624"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "user",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("full_name", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column("email", sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column(
            "role",
            sa.Enum("SUPERUSER", native_enum=False),
            autoincrement=False,
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id", name="user_pkey"),
    )


def downgrade() -> None:
    op.drop_table(User)
