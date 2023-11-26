import json
from dotenv import load_dotenv

load_dotenv()

import jwt
import os
from jwt.algorithms import RSAAlgorithm
import requests
from fastapi import Request, HTTPException
from src.models.user import User


audience = None
key = None


def __get_sso_config():
    global audience
    global key
    audience = os.environ["AUTH_AUDIENCE"]
    jwks_url = "https://bridgerkc.duckdns.org:8641/realms/dev/protocol/openid-connect/certs"
    # jwks_url = "https://100.68.122.57:8641/realms/dev/protocol/openid-connect/certs"
    jwks = requests.get(jwks_url)
    jwk = jwks.json()["keys"][0]
    key = RSAAlgorithm.from_jwk(json.dumps(jwk))


def get_user(token: str) -> User:
    global audience
    global key
    if not audience or not key:
        __get_sso_config()
    raw_user = jwt.decode(token, audience=audience, key=key, algorithms=["RS256"])  # type: ignore
    print(raw_user)
    user = User(
        sub=raw_user["sub"],
        badgerid=raw_user["badgerid"],
        groups=raw_user.get("groups", []),
        preferred_username=raw_user["preferred_username"],
        azp=raw_user["azp"],
        email=raw_user["email"],
        token=token,
    )
    return user


def authenticate_user(request: Request) -> User:
    print(request.headers)
    if "Authorization" in request.headers:
        auth_header = request.headers["Authorization"]
        token = auth_header.split(" ")[1]
        user = get_user(token)
        request.state.user = user
        return user

    if "cookie" in request.headers:
        cookie_list = request.headers["Cookie"].split("; ")
        for cookie in cookie_list:
            if "jwt=" in cookie:
                jwt = cookie.replace("jwt=", "")
                user = get_user(jwt)
                request.state.user = user
                return user

    raise HTTPException(status_code=403, detail="Authorization Token Not Found")
