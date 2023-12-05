"""user signup changes

Revision ID: c76a397a958f
Revises: fdd02c5e4d53
Create Date: 2023-12-04 22:13:41.417977

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "c76a397a958f"
down_revision: Union[str, None] = "fdd02c5e4d53"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user_invite",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("org_id", sa.Integer(), nullable=False),
        sa.Column("target_email", sa.String(), nullable=False),
        sa.Column("target_roles", sa.ARRAY(sa.VARCHAR()), nullable=True),
        sa.Column("accepted", sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(
            ["org_id"],
            ["organization.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.add_column(
        "user", sa.Column("given_name", sa.String(), nullable=False, server_default="")
    )
    op.add_column(
        "user", sa.Column("family_name", sa.String(), nullable=False, server_default="")
    )
    op.add_column(
        "user", sa.Column("auth_id", sa.String(), nullable=False, server_default="")
    )
    op.add_column("user", sa.Column("roles", sa.ARRAY(sa.VARCHAR()), nullable=True))
    op.drop_column("user", "full_name")
    op.drop_column("user", "role")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "user",
        sa.Column(
            "role",
            postgresql.ENUM("SUPERUSER", "PUBADMIN", name="roles"),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.add_column(
        "user",
        sa.Column("full_name", sa.VARCHAR(), autoincrement=False, nullable=False),
    )
    op.drop_column("user", "roles")
    op.drop_column("user", "auth_id")
    op.drop_column("user", "family_name")
    op.drop_column("user", "given_name")
    op.drop_table("user_invite")
    # ### end Alembic commands ###
