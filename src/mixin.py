from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.market.models import Category, SelectCity


async def get_context(session: AsyncSession) -> dict:
    query_category = await session.execute(select(Category).order_by(Category.name))
    return {'categories': query_category.unique().scalars().all(),
            'cities': SelectCity,
            'now': datetime.now().strftime("%Y-%m-%d %X")}
