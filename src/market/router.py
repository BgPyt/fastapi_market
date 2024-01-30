from ctypes import Union
from fastapi import APIRouter, Depends, Request, Query
from sqlalchemy import select, and_
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload
from src.database import get_async_session
from src.market.models import Subcategories, Category, Product
from src.mixin import get_context
from src.setting import templates

router = APIRouter(
    prefix="/catalog",
    tags=["Catalog"],
)


@router.get('')
async def get_all_category(request: Request,
                           session: AsyncSession = Depends(get_async_session)
                           ):
    result = await session.execute(select(Category))
    return templates.TemplateResponse('market/catalog.html', {'request': request,
                                                              'category': result.scalars().all()
                                                              } | await get_context(session))



@router.get('/{category}/{subcategory}')
async def get_subcategory(request: Request,
                          category: str,
                          subcategory: str,
                          session: AsyncSession = Depends(get_async_session)
                          ):
    try:
        query_subcategory = await session.execute(
            select(Subcategories)
            .filter(Subcategories.slug == f'{category}/{subcategory}')
            .options(joinedload(Subcategories.category))
        )
        result = query_subcategory.unique().scalar_one()
        navigation = {'category': result.category, 'subcategory': result}
    except NoResultFound:
        return templates.TemplateResponse('404.html', {'request': request}, status_code=404)

    query_subcategory = await session.execute(select(Subcategories).filter(
        Subcategories.subcategories_relationship == navigation['subcategory']))

    return templates.TemplateResponse('market/category.html',
                                      {'request': request,
                                       'navigation': navigation,
                                       'subcategory': query_subcategory.scalars().all(),
                                       } | await get_context(session)
                                      )


@router.get('/{category}/{subcategory}/{subcategory_1}')
async def get_subcategory(request: Request,
                          category: str,
                          subcategory: str,
                          subcategory_1: str,
                          session: AsyncSession = Depends(get_async_session)
                          ):
    try:
        query_subcategory = await session.execute(
            select(Subcategories)
            .filter(Subcategories.slug == f'{category}/{subcategory}/{subcategory_1}')
            .options(joinedload(Subcategories.category))
            .options(joinedload(Subcategories.subcategories_relationship))
        )
        result = query_subcategory.unique().scalar_one()
        navigation = {'category': result.category, 'subcategory': result.subcategories_relationship,
                      'subcategory_1': result}
    except NoResultFound:
        return templates.TemplateResponse('404.html', {'request': request}, status_code=404)

    query_subcategory = await session.execute(select(Subcategories).filter(
        Subcategories.subcategories_relationship == navigation['subcategory_1']))

    return templates.TemplateResponse('market/category.html',
                                      {'request': request,
                                       'navigation': navigation,
                                       'subcategory': query_subcategory.scalars().all(),
                                       } | await get_context(session)
                                      )
