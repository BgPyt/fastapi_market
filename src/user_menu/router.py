
from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi_users import schemas, exceptions
from fastapi_users.router import ErrorCode
from sqlalchemy import select, and_
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload
from fastapi.responses import RedirectResponse
from starlette import status
from fastapi.responses import JSONResponse
from src.auth.base_config import current_user, current_active_user
from src.auth.email import verify_token
from src.celery_task.tasks import send_email_registration
from src.auth.manage import UserManager, get_user_manager
from src.auth.models import User
from src.auth.schemes import UserCreate
from src.database import get_async_session
from src.market.models import Subcategories, Category, Product
from src.mixin import get_context
from src.setting import templates
import src.user_menu.exceptions as exception

router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@router.get("/favourites")
async def get_favorites(request: Request,
                        session: AsyncSession = Depends(get_async_session)):
    return templates.TemplateResponse('user/favourites.html', {'request': request,
                                                               } | await get_context(session))


@router.get("/login", description="Вход пользователя в систему")
async def user_login(request: Request,
                     session: AsyncSession = Depends(get_async_session),
                     user: User = Depends(current_user)):
    if user:
        return RedirectResponse('/user', status_code=302)
    return templates.TemplateResponse('user/login.html', {'request': request,
                                                          } | await get_context(session))


@router.get("/", description="Кабинет пользователя")
async def user_cabinet(request: Request,
                       session: AsyncSession = Depends(get_async_session),
                       user: User = Depends(current_user)):
    if not user:
        return RedirectResponse('/user/login', status_code=302)
    return templates.TemplateResponse('user/cabinet.html', {'request': request,
                                                            } | await get_context(session))


@router.get("/basket", description="Корзина пользователя")
async def user_cabinet(request: Request,
                       session: AsyncSession = Depends(get_async_session)):
    return templates.TemplateResponse('user/basket.html', {'request': request,
                                                            } | await get_context(session))


@router.get("/email/create-user", description="Регистрацию пользователя через токен")
async def email_verification(request: Request,
                             token: str,
                             user_manager: UserManager = Depends(get_user_manager)):
    payload = await verify_token(token)
    try:
        await user_manager.email_create(user_create=payload)
    except exceptions.UserAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.REGISTER_USER_ALREADY_EXISTS,
        )
    return RedirectResponse('/user/login', status_code=status.HTTP_308_PERMANENT_REDIRECT)


@router.post('/email/confirmation', description="Отправка токена на почту для регистрации")
async def email_confirmation(
        request: Request,
        user: UserCreate,
        user_manager: UserManager = Depends(get_user_manager)):
    try:
        user_dict = await user_manager.validate_user(
            user, safe=True, request=request
        )
    except exceptions.UserAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.REGISTER_USER_ALREADY_EXISTS,
        )
    except exception.PasswordNotMatch:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="PASSWORDS DON'T MATCH"
        )
    send_email_registration.delay(user_dict)

    return JSONResponse(status_code=status.HTTP_202_ACCEPTED,
                        content={"detail": "message has been sent"})
