from datetime import datetime, timedelta

from jose import jwt
from pydantic import EmailStr

from config import ALGORITHM, SECRET_KEY

from fastapi import Response


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def token_to_cookie(user_email: EmailStr, response: Response):
    access_token = create_access_token(data={"sub": user_email})
    # token_expires = timedelta(minutes=30)
    # response.set_cookie(key="access_token", value=f"value={access_token}", httponly=True,
    #                     expires=int(token_expires.total_seconds()), max_age=int(token_expires.total_seconds()))
    return access_token
