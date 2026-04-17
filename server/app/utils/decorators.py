from functools import wraps
from flask import request, jsonify
from app.models.user import User
from app.utils.jwt_helper import decode_token


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return jsonify({"message": "Token is missing"}), 401

        token = auth_header.split(" ")[1]

        try:
            data = decode_token(token)
            user_id = data.get("user_id")

            if not user_id:
                return jsonify({"message": "Invalid token payload"}), 401

            current_user = User.query.get(user_id)

            if not current_user:
                return jsonify({"message": "User not found"}), 401

        except Exception:
            return jsonify({"message": "Invalid or expired token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def roles_required(*roles):
    def wrapper(f):
        @wraps(f)
        def decorated(current_user, *args, **kwargs):
            if current_user.role not in roles:
                return jsonify({"message": "Access denied"}), 403
            return f(current_user, *args, **kwargs)

        return decorated
    return wrapper