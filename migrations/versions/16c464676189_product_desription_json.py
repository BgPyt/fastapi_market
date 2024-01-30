"""Product_desription_json

Revision ID: 16c464676189
Revises: 34cb7c72d22b
Create Date: 2023-07-21 12:40:41.648631

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '16c464676189'
down_revision = '34cb7c72d22b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('characteristic', sa.JSON(), nullable=False))
    op.drop_column('product', 'description')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('product', 'characteristic')
    # ### end Alembic commands ###
