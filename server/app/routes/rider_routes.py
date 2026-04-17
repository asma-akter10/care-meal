from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.order import Order
from app.utils.decorators import token_required, roles_required

rider_bp = Blueprint("rider_bp", __name__)

@rider_bp.route("/orders", methods=["GET"])
@token_required
@roles_required("rider")
def get_rider_orders(current_user):
    orders = Order.query.filter_by(rider_id=current_user.id).order_by(Order.created_at.desc()).all()

    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "customer_id": order.customer_id,
            "total_amount": float(order.total_amount),
            "delivery_address": order.delivery_address,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
        })

    return jsonify(result), 200

@rider_bp.route("/orders/available", methods=["GET"])
@token_required
@roles_required("rider")
def get_available_orders(current_user):
    orders = Order.query.filter(
        Order.status.in_(["accepted", "ready_for_pickup"]),
        Order.rider_id.is_(None)
    ).order_by(Order.created_at.desc()).all()

    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "customer_id": order.customer_id,
            "total_amount": float(order.total_amount),
            "delivery_address": order.delivery_address,
            "status": order.status,
            "created_at": order.created_at.isoformat()
        })

    return jsonify(result), 200

@rider_bp.route("/orders/<int:order_id>/assign", methods=["PUT"])
@token_required
@roles_required("rider")
def assign_order(current_user, order_id):
    order = Order.query.get_or_404(order_id)

    if order.rider_id is not None:
        return jsonify({"message": "Order already assigned"}), 400

    if order.status not in ["accepted", "ready_for_pickup"]:
        return jsonify({"message": "Only accepted or ready for pickup orders can be assigned to rider"}), 400

    order.rider_id = current_user.id
    order.status = "assigned_to_rider"

    db.session.commit()

    return jsonify({"message": "Order assigned successfully"}), 200

@rider_bp.route("/orders/<int:order_id>/status", methods=["PUT"])
@token_required
@roles_required("rider")
def update_rider_order_status(current_user, order_id):
    data = request.get_json() or {}
    status = data.get("status", "").strip()

    allowed_statuses = ["picked_up", "on_the_way", "delivered"]

    if status not in allowed_statuses:
        return jsonify({"message": "Invalid status"}), 400

    order = Order.query.get_or_404(order_id)

    if order.rider_id != current_user.id:
        return jsonify({"message": "You can update only your assigned orders"}), 403

    order.status = status
    db.session.commit()

    return jsonify({"message": "Order status updated successfully"}), 200