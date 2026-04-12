from functools import wraps
from flask import request, jsonify
from app.models.user import User
from app.utils.jwt_helper import decode_token

def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Token missing"}), 401

        token = auth_header.split(" ")[1]

        try:
            data = decode_token(token)
            current_user = User.query.get(data["user_id"])
            if not current_user:
                return jsonify({"message": "User not found"}), 404
        except Exception:
            return jsonify({"message": "Invalid or expired token"}), 401

        return fn(current_user, *args, **kwargs)

    return wrapper

def roles_required(*allowed_roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(current_user, *args, **kwargs):
            if current_user.role not in allowed_roles:
                return jsonify({"message": "Access denied"}), 403
            return fn(current_user, *args, **kwargs)
        return wrapper
    return decorator

def roles_required(*roles):
    def wrapper(fn):
        from functools import wraps

        @wraps(fn)
        def decorated(current_user, *args, **kwargs):
            if current_user.role not in roles:
                return {"message": "Access denied"}, 403

            return fn(current_user, *args, **kwargs)

        return decorated
    return wrapper