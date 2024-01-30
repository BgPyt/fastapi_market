import os
from typing import Any
from sqladmin import ModelView
from sqlalchemy import update

from src.auth.models import User
from src.database import async_session_maker
from src.market.models import Product, Category, Subcategories, Storage, Address


class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.username, User.email]


class ProductAdmin(ModelView, model=Product):
    column_exclude_list = [Product.characteristic]
    page_size = 100

    async def on_model_delete(self, model: Any) -> None:
        if model.image:
            os.remove(model.image.path)

    async def on_model_change(self, data: dict, model: Any, is_created: bool) -> None:
        if not is_created:
            if not data['image'].content_type:
                del data['image']
            else:
                await self.on_model_delete(model)


class CategoryAdmin(ModelView, model=Category):
    column_list = [Category.id, Category.name, Category.slug]
    form_excluded_columns = [Category.subcategories]
    page_size = 100


class SubcategoriesAdmin(ModelView, model=Subcategories):
    column_list = [Subcategories.id, Subcategories.name, Subcategories.category, Subcategories.subcategories_relationship, Subcategories.slug]
    form_columns = [Subcategories.category, Subcategories.subcategories_relationship, Subcategories.name, Subcategories.slug]
    page_size = 100


class StorageAdmin(ModelView, model=Storage):

    async def after_model_change(
        self, data: dict, model: Any, is_created: bool
    ) -> None:
        stmt = update(Product).where(Product.id == model.product).values(quantity=Product.quantity + model.quantity)
        async with async_session_maker() as session:
            result = await session.execute(stmt)
            await session.commit()

class AddressAdmin(ModelView, model=Address):
    column_list = [Address.id, Address.title, Address.city]

    

    





