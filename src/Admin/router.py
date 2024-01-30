from fastapi import APIRouter, Depends
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_async_session
from src.market.models import Subcategories, Category
from fastapi.encoders import jsonable_encoder

router = APIRouter(
    prefix='/sqladmin',
    tags=['Sqladmin']
)


@router.get('/search_subcategories_relationship')
async def get_filter_subcategories_relationship(category: str, session: AsyncSession = Depends(get_async_session)):
    stmt = select(Subcategories).join(Category, Subcategories.category_id == Category.id).filter(and_(Category.name == category, Subcategories.subcategories_id == None))
    query = await session.execute(stmt)
    return [jsonable_encoder(obj) for obj in query.scalars().all()]

