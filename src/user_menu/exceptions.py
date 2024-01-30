from fastapi_users.exceptions import FastAPIUsersException


class PasswordNotMatch(FastAPIUsersException):
    pass
