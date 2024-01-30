from typing import Optional

from fastapi import Depends
from sqladmin import Admin
from sqladmin.authentication import AuthenticationBackend
from starlette.exceptions import HTTPException
from starlette.requests import Request
from starlette.responses import RedirectResponse

from src.auth.base_config import current_user
from src.auth.models import User
from src.config import ADMIN_PASSWORD, ADMIN_LOGIN, SECRET
from itsdangerous import URLSafeSerializer


auth_s = URLSafeSerializer(SECRET, "auth")


class AdminAuth(AuthenticationBackend):

    async def login(self, request: Request) -> bool:
        form = await request.form()
        login, password = form["username"], form["password"]
        if login != ADMIN_LOGIN or password != ADMIN_PASSWORD:
            raise HTTPException(status_code=400, detail='Invalid Login or Password')
        token = auth_s.dumps({"login": login, "password": password})
        request.session.update({"token": token})

        return True

    async def logout(self, request: Request) -> bool:
        # Usually you'd want to just clear the session
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> Optional[RedirectResponse]:
        token = request.session.get("token")

        if not token:
            return RedirectResponse(request.url_for("admin:login"), status_code=302)

        data = auth_s.loads(token)
        if data['login'] != ADMIN_LOGIN or data['password'] != ADMIN_PASSWORD:
            return RedirectResponse(request.url_for("admin:login"), status_code=302)


        # Check the token in depth


authentication_backend = AdminAuth(secret_key=SECRET)
