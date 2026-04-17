from flask import Blueprint, jsonify
from app.utils.decorators import token_required

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/me", methods=["GET"])
@token_required
def get_me(current_user):
    return jsonify({
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone,
        "role": current_user.role,
        "status": current_user.status
    }), 200