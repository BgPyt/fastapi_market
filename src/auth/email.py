from typing import List
import jwt
from fastapi_users import schemas
from pydantic import EmailStr
import smtplib
from src.auth.models import User
from src.config import MAIL_USERNAME, MAIL_PASSWORD, SECRET
import datetime
from fastapi import HTTPException
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


async def send_email_registration(user_dict: dict) -> None:
    token_data = {
        "username": user_dict.get('username'),
        "email": user_dict.get('email'),
        "hashed_password": user_dict.get('hashed_password'),
        "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1),
    }

    token_jwt = jwt.encode(token_data, SECRET)

    template = f"""<!doctype html>
        <html lang="en">
        <head>
         <title>HTML Document Template</title>
         <style>
         p {{
            font-family: Arial;
        }}
        .block {{
          background-color: #0099f5; 
          display: flex;
          flex-direction: column;
          border-radius: 1%; 
          padding: 20px;
          font-weight: 800;  
          font-family: "Times New Roman";     
        }}
        .button-verify {{
          display: flex;
          width: 200px;
          height: 100px;
          background-color: #016fe1; 
          border: 1px solid black;
          cursor: pointer;
          justify-content: center;
          transition: 0.5s;
          }}
          .button-verify:hover {{
          background-color: rgb(252, 194, 140); 
          }}
          a {{
          margin-top: 10px;
          align-self: center;
          text-decoration: none;
          color: black;
          }}
          span {{
            align-self: center;
          }}
          .main-block {{
            display: flex;
            box-sizing: border-box
            align-items: center;
            flex-direction: column; 
            justify-content: center;
            width: 100%;
            min-height: 100%;
            padding: 20px;
          }} 
           </style>
           </head>
           <body>
           <div class="main-block">
           <div class="block">
               <span>Благодарим {user_dict['username']} за успешную регистрацию у нас..</span>
               <span>Перейдите по ссылке ниже, чтобы подвердить свой аккаунт</span>
               <a href="http://127.0.0.0:8000/user/email/create-user?token={token_jwt}"><div class="button-verify"><span>Подвердить</span></div></a>
           </div>
           </body>
</html>"""
    email = user_dict.get('email')
    message = MIMEMultipart("alternative")
    message["Subject"] = "Подверждение аккаунта - str42.ru"
    message["From"] = MAIL_USERNAME
    message["To"] = email

    part = MIMEText(template, "html")

    message.attach(part)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.sendmail(
            MAIL_USERNAME, email, message.as_string()
        )


async def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms="HS256")
    except (jwt.ExpiredSignatureError, jwt.DecodeError):
        raise HTTPException(status_code=404, detail={"error": "Invalid token or time is out"})
    payload.pop('exp')
    return payload


