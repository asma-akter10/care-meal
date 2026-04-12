from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.user import User
from app.models.order import Order
from app.models.homemaker_profile import HomemakerProfile
from app.utils.decorators import token_required, roles_required

admin_bp = Blueprint("admin_bp", __name__)

@admin_bp.route("/users", methods=["GET"])
@token_required
@roles_required("admin")
def get_all_users(current_user):
    users = User.query.order_by(User.created_at.desc()).all()

    return jsonify([
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "status": user.status
        }
        for user in users
    ]), 200

@admin_bp.route("/orders", methods=["GET"])
@token_required
@roles_required("admin")
def get_all_orders(current_user):
    orders = Order.query.order_by(Order.created_at.desc()).all()

    return jsonify([
        {
            "id": order.id,
            "customer_id": order.customer_id,
            "total_amount": float(order.total_amount),
            "delivery_address": order.delivery_address,
            "status": order.status,
            "created_at": order.created_at.isoformat()
        }
        for order in orders
    ]), 200

@admin_bp.route("/homemakers", methods=["GET"])
@token_required
@roles_required("admin")
def get_homemakers(current_user):
    profiles = HomemakerProfile.query.order_by(HomemakerProfile.id.desc()).all()

    result = []
    for profile in profiles:
        result.append({
            "id": profile.id,
            "user_id": profile.user.id,
            "name": profile.user.name,
            "email": profile.user.email,
            "status": profile.user.status,
            "approval_status": profile.approval_status,
            "kitchen_address": profile.kitchen_address,
        })

    return jsonify(result), 200

@admin_bp.route("/homemakers/<int:user_id>/approve", methods=["PUT"])
@token_required
@roles_required("admin")
def approve_homemaker(current_user, user_id):
    user = User.query.get_or_404(user_id)

    if user.role != "homemaker":
        return jsonify({"message": "User is not a homemaker"}), 400

    profile = HomemakerProfile.query.filter_by(user_id=user.id).first()
    if not profile:
        return jsonify({"message": "Homemaker profile not found"}), 404

    user.status = "active"
    profile.approval_status = "approved"

    db.session.commit()

    return jsonify({"message": "Homemaker approved successfully"}), 200

@admin_bp.route("/homemakers/<int:user_id>/reject", methods=["PUT"])
@token_required
@roles_required("admin")
def reject_homemaker(current_user, user_id):
    user = User.query.get_or_404(user_id)

    if user.role != "homemaker":
        return jsonify({"message": "User is not a homemaker"}), 400

    profile = HomemakerProfile.query.filter_by(user_id=user.id).first()
    if not profile:
        return jsonify({"message": "Homemaker profile not found"}), 404

    user.status = "inactive"
    profile.approval_status = "rejected"

    db.session.commit()

    return jsonify({"message": "Homemaker rejected successfully"}), 200