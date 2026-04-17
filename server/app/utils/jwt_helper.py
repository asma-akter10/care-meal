import jwt
from datetime import datetime, timedelta
from flask import current_app


def create_access_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=1)
    }

    token = jwt.encode(
        payload,
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return token


def decode_token(token):
    payload = jwt.decode(
        token,
        current_app.config["SECRET_KEY"],
        algorithms=["HS256"]
    )
    return payload