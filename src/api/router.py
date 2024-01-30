from typing import List
from fastapi import APIRouter, Depends, Query, Request, Response
from sqlalchemy import select, asc, desc, and_, union_all, union
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload, subqueryload, aliased
from src.database import get_async_session
from src.market.models import Subcategories, Category, Product, Storage, Address
from pydantic import BaseModel
import asyncio




router = APIRouter(
    prefix="/api",
    tags=["API"],
)

@router.get('/search/menu-2')
async def get_subcategories(response: Response, category_name: str, session: AsyncSession = Depends(get_async_session)):
    stmt = (select(Subcategories)
            .join(Category, Subcategories.category_id == Category.id)
            .filter(Category.name == category_name)
            .order_by(Subcategories.subcategories_id.desc(), Subcategories.name)
            .options(selectinload(Subcategories.category)))
    category = await session.execute(select(Category).where(Category.name == category_name))
    query = await session.execute(stmt)
    subcategories_list = query.scalars().all()
    nested_categories = dict()
    for subcategory in subcategories_list:
        if not subcategory.subcategories_relationship:
            nested_categories[subcategory] = []
        else:
            nested_categories[subcategory.subcategories_relationship].append(subcategory)
    response.headers.append('category_slug', category.scalar_one().slug)

    return sorted(nested_categories.items(), key=lambda item: len(item[1]), reverse=True)


@router.get('/get-products')
async def get_products(request: Request, category: list[str] = Query(), session: AsyncSession = Depends(get_async_session)):
    Subcategories_child = aliased(Subcategories)
    stmt = (select(Product)
            .join(Subcategories, Product.subcategories_id == Subcategories.id)
            .join(Category, Subcategories.category_id == Category.id)
            .outerjoin(Storage, Product.id == Storage.product)
            .outerjoin(Address, Address.id == Storage.address)
            .join(Subcategories_child, Subcategories.subcategories_id == Subcategories_child.id)
            .order_by(Product.address, Product.id)
            .options(joinedload(Product.address))
            .options(joinedload(Product.subcategories)))

    if len(category) == 2:
        stmt = stmt.filter(Subcategories_child.name == category[-1])
    elif len(category) == 3:
        stmt = stmt.filter(Subcategories.name == category[-1])
    else:
        stmt = stmt.filter(Category.name == category[0])

    query_product = await (session.execute(stmt))

    return query_product.unique().scalars().all()


@router.get('/get-items')
async def get_favourites(id_list: str = Query(description="Передача id продуктов"),
                         session: AsyncSession = Depends(get_async_session)):
    id_list = list(map(int, eval(id_list)))
    result = await session.execute(select(Product).filter(Product.id.in_(id_list)).options(joinedload(Product.address)))
    return result.unique().scalars().all()


@router.get('/categoryAll')
async def get_categories(sessin: AsyncSession = Depends(get_async_session)):
    result = await sessin.execute(select(Category))
    return result.scalars().all()


@router.get('/type-products')
async def get_type_products(type_product: str, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Product).where(Product.type == type_product))
    return result.scalars().all()


@router.get('/products_filter')
async def get_products(request: Request,
                       filter_slug: str = Query(),
                       session: AsyncSession = Depends(get_async_session)
                       ):
    stmt = (select(Product)
            .join(Subcategories, Product.subcategories_id == Subcategories.id)
            .filter(Subcategories.slug.like(filter_slug + '%'))
            .options(joinedload(Product.address)))
    result = await session.execute(stmt)
    return result.scalars().unique().all()


@router.get('/subcategories_filter')
async def get_subcategories(request: Request,
                            filter_slug: str = Query(),
                            session: AsyncSession = Depends(get_async_session)
                            ):
    stmt = (select(Subcategories)
            .filter(Subcategories.slug.like(filter_slug + '/%')))
    slug_list = ['/'.join(filter_slug.split('/')[:i+1]) for i in range(len(filter_slug.split('/')))]
    stmt1 = (select(Category.name, Category.slug).filter(Category.slug.in_(slug_list)))
    stmt2 = (select(Subcategories.name, Subcategories.slug).filter(Subcategories.slug.in_(slug_list)))
    result_nav = await session.execute(union_all(stmt1, stmt2))
    f = result_nav.mappings().all()
    result = await session.execute(stmt)
    return [result.scalars().all(), f]
