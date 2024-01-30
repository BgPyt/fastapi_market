from fastapi import FastAPI, Request, Depends, HTTPException
from sqlalchemy import select, ScalarResult, ChunkedIteratorResult, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, subqueryload, joinedload
from starlette import status
from starlette.middleware.cors import CORSMiddleware
from src.auth.base_config import auth_backend, fastapi_users, current_user
from src.auth.manage import get_user_manager, UserManager
from src.auth.schemes import UserRead, UserCreate
from sqladmin import Admin
from src.database import engine, get_async_session
import uvicorn
from src.api.router import router as api_router
from src.Admin.AuthenticationBackend import authentication_backend
from src.Admin.ModelAdmin import UserAdmin, ProductAdmin, SubcategoriesAdmin, CategoryAdmin, StorageAdmin, AddressAdmin
from fastapi.staticfiles import StaticFiles
from src.market.models import Category, Product, Subcategories, Address, Storage, SelectCity
from src.Admin.router import router as admin_router
from src.market.router import router as market_router
from datetime import datetime
from src.user_menu.router import router as user_router
from src.mixin import get_context
from src.setting import templates

app = FastAPI()
app.mount("/storage", StaticFiles(directory="storage"), name="storage")

admin = Admin(app, engine, authentication_backend=authentication_backend)

admin.add_view(UserAdmin)
admin.add_view(ProductAdmin)
admin.add_view(SubcategoriesAdmin)
admin.add_view(CategoryAdmin)
admin.add_view(StorageAdmin)
admin.add_view(AddressAdmin)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(admin_router)
app.include_router(market_router)
app.include_router(api_router)
app.include_router(user_router)


@app.exception_handler(404)
async def not_found_exception_handler(request: Request, exc: HTTPException):
    return templates.TemplateResponse('404.html', {'request': request}, status_code=404)


@app.get('/')
async def root(request: Request, session: AsyncSession = Depends(get_async_session)):
    stmt_product = select(Product)
    query_product = await session.execute(stmt_product)
    return templates.TemplateResponse('market/base.html', {'request': request,
                                                           'products': query_product.unique().scalars().all(),
                                                           } | await get_context(session))





if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.0", port=8000)
