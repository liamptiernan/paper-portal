"""update publications table

Revision ID: 814ffc4cad0d
Revises: deef52d61863
Create Date: 2023-11-10 09:18:54.142731

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "814ffc4cad0d"
down_revision: Union[str, None] = "deef52d61863"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("publication", sa.Column("description", sa.String(), nullable=True))
    op.add_column("publication", sa.Column("location", sa.String(), nullable=True))
    op.add_column(
        "publication", sa.Column("distribution_unit", sa.String(), nullable=False)
    )
    op.add_column("publication", sa.Column("region_type", sa.String(), nullable=False))
    op.add_column(
        "publication", sa.Column("distribution_radius", sa.Integer(), nullable=False)
    )
    op.alter_column("publication", "format", existing_type=sa.VARCHAR(), nullable=False)
    op.alter_column(
        "publication", "estimated_reach", existing_type=sa.INTEGER(), nullable=False
    )
    op.alter_column("user", "email", existing_type=sa.VARCHAR(), nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("user", "email", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column(
        "publication", "estimated_reach", existing_type=sa.INTEGER(), nullable=True
    )
    op.alter_column("publication", "format", existing_type=sa.VARCHAR(), nullable=True)
    op.drop_column("publication", "distribution_radius")
    op.drop_column("publication", "region_type")
    op.drop_column("publication", "distribution_unit")
    op.drop_column("publication", "location")
    op.drop_column("publication", "description")
    # ### end Alembic commands ###
