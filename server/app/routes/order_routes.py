from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.utils.decorators import token_required, roles_required

order_bp = Blueprint("order_bp", __name__)

@order_bp.route("/", methods=["POST"])
@token_required
def create_order(current_user):
    data = request.get_json() or {}

    items = data.get("items", [])
    total_amount = data.get("total_amount")
    delivery_address = data.get("delivery_address", "").strip()
    note = data.get("note", "").strip()
    payment_method = data.get("payment_method", "cod").strip()
    transaction_id = data.get("transaction_id")

    if not items or total_amount is None or not delivery_address:
        return jsonify({"message": "Items, total amount, and delivery address are required"}), 400

    if payment_method not in ["cod", "online"]:
        return jsonify({"message": "Invalid payment method"}), 400

    payment_status = "paid" if payment_method == "online" else "pending"

    order = Order(
        customer_id=current_user.id,
        total_amount=total_amount,
        delivery_address=delivery_address,
        note=note,
        status="pending",
        payment_method=payment_method,
        payment_status=payment_status,
        transaction_id=transaction_id
    )

    db.session.add(order)
    db.session.flush()

    for item in items:
        order_item = OrderItem(
            order_id=order.id,
            food_item_id=item["id"],
            quantity=item["quantity"],
            unit_price=item["price"],
            subtotal=item["price"] * item["quantity"]
        )
        db.session.add(order_item)

    db.session.commit()

    return jsonify({
        "message": "Order placed successfully",
        "order_id": order.id
    }), 201

@order_bp.route("/my-orders", methods=["GET"])
@token_required
def get_my_orders(current_user):
    orders = Order.query.filter_by(customer_id=current_user.id).order_by(Order.created_at.desc()).all()

    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "total_amount": float(order.total_amount),
            "delivery_address": order.delivery_address,
            "note": order.note,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "items_count": len(order.items),
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
            "transaction_id": order.transaction_id,
            "rider": {
                "id": order.rider.id,
                "name": order.rider.name,
                "phone": order.rider.phone,
            } if order.rider else None,  
        })

    return jsonify(result), 200


@order_bp.route("/homemaker", methods=["GET"])
@token_required
@roles_required("homemaker")
def get_homemaker_orders(current_user):
    from app.models.food_item import FoodItem

    foods = FoodItem.query.filter_by(provider_id=current_user.id).all()
    food_ids = [f.id for f in foods]

    orders = Order.query.join(OrderItem).filter(
        OrderItem.food_item_id.in_(food_ids)
    ).order_by(Order.created_at.desc()).all()

    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "total_amount": float(order.total_amount),
            "status": order.status,
            "created_at": order.created_at.isoformat()
        })

    return jsonify(result), 200

@order_bp.route("/<int:order_id>/status", methods=["PUT"])
@token_required
@roles_required("homemaker")
def update_order_status(current_user, order_id):
    data = request.get_json() or {}
    status = data.get("status")

    order = Order.query.get_or_404(order_id)

    order.status = status
    db.session.commit()

    return jsonify({"message": "Status updated"}), 200