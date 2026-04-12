from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models.user import User
from app.models.customer_profile import CustomerProfile
from app.models.homemaker_profile import HomemakerProfile
from app.models.rider_profile import RiderProfile
from app.utils.jwt_helper import create_token

auth_bp = Blueprint("auth_bp", __name__)

VALID_ROLES = {"customer", "homemaker", "rider"}

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    role = data.get("role", "customer").strip().lower()
    phone = data.get("phone", "").strip()

    if not name or not email or not password or not role:
        return jsonify({"message": "Missing required fields"}), 400

    if role not in VALID_ROLES:
        return jsonify({"message": "Invalid role"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already exists"}), 409

    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        phone=phone,
        role=role,
        status="pending" if role == "homemaker" else "active",
    )

    db.session.add(user)
    db.session.flush()

    if role == "customer":
        db.session.add(CustomerProfile(user_id=user.id))
    elif role == "homemaker":
        db.session.add(HomemakerProfile(user_id=user.id, approval_status="pending"))
    elif role == "rider":
        db.session.add(RiderProfile(user_id=user.id, availability_status="available"))

    db.session.commit()

    token = create_token(user)

    return jsonify({
        "message": "Registration successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "status": user.status
        }
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_token(user)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "status": user.status
        }
    }), 200