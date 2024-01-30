from typing import Optional, Union
from fastapi import Depends, Request, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_users import BaseUserManager, IntegerIDMixin, exceptions, models, schemas
from src.auth.utils import get_user_db, CustomSQLAlchemyUserDatabase
from src.auth.models import User
from src.config import SECRET
from fastapi_users import schemas, exceptions
from fastapi_users.router import ErrorCode
import src.user_menu.exceptions as exception


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def email_create(
            self,
            user_create: dict,
            request: Optional[Request] = None,
    ) -> models.UP:
        existing_user = await self.user_db.get_by_email(user_create.get('email'))
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        created_user = await self.user_db.create(user_create)

        await self.on_after_register(created_user, request)

        return created_user

    async def validate_user(
            self,
            user_create: schemas.UC,
            safe: bool = False,
            request: Optional[Request] = None,
    ):
        if user_create.password != user_create.repeat_password:
            raise exception.PasswordNotMatch()
        del user_create.repeat_password
        await self.validate_password(user_create.password, user_create)

        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = (
            user_create.create_update_dict()
            if safe
            else user_create.create_update_dict_superuser()
        )

        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)

        return user_dict

    async def authenticate(
        self, credentials: OAuth2PasswordRequestForm
    ) -> Optional[models.UP]:
        """
        Authenticate and return a user following an email(username) and a password.

        Will automatically upgrade password hash if necessary.

        :param credentials: The user credentials.
        """
        checking_for_email = await self.checking_for_user(get_user=self.get_by_email, value=credentials.username)
        checking_for_username = await self.checking_for_user(get_user=self.get_by_username, value=credentials.username)

        user = list(filter(lambda user_obj: bool(user_obj), [checking_for_email, checking_for_username]))[0]
        if not user:
            self.password_helper.hash(credentials.password)
            return None

        verified, updated_password_hash = self.password_helper.verify_and_update(
            credentials.password, user.hashed_password
        )
        if not verified:
            return None
        # Update password hash to a more robust one if needed
        if updated_password_hash is not None:
            await self.user_db.update(user, {"hashed_password": updated_password_hash})

        return user

    async def get_by_username(self, username: str) -> models.UP:
        """
        Get a user by e-mail.

        :param username: username of the user to retrieve.
        :raises UserNotExists: The user does not exist.
        :return: A user.
        """
        user = await self.user_db.get_by_username(username)

        if user is None:
            raise exceptions.UserNotExists()

        return user

    @staticmethod
    async def checking_for_user(
            get_user: Union[CustomSQLAlchemyUserDatabase.get_by_email, CustomSQLAlchemyUserDatabase.get_by_username],
            value: str):
        try:
            user = await get_user(value)
        except exceptions.UserNotExists:
            return None
        else:
            return user

    # async def on_after_forgot_password(
    #         self, user: models.UP, token: str, request: Optional[Request] = None
    # ) -> None:





async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
