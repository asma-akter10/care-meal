from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models.user import User
from app.models.customer_profile import CustomerProfile
from app.models.homemaker_profile import HomemakerProfile
from app.models.rider_profile import RiderProfile
from app.utils.jwt_helper import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    password = data.get("password", "").strip()
    role = data.get("role", "customer").strip().lower()

    if not name or not email or not phone or not password:
        return jsonify({"message": "Name, email, phone, and password are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 409

    user = User(
        name=name,
        email=email,
        phone=phone,
        password_hash=generate_password_hash(password),
        role=role,
        status="pending" if role == "homemaker" else "active",
    )

    db.session.add(user)
    db.session.flush()

    if role == "customer":
        profile = CustomerProfile(user_id=user.id)
        db.session.add(profile)

    elif role == "homemaker":
        profile = HomemakerProfile(user_id=user.id, approval_status="pending")
        db.session.add(profile)

    elif role == "rider":
        profile = RiderProfile(user_id=user.id, availability_status="available")
        db.session.add(profile)

    db.session.commit()

    token = create_access_token(user.id)

    return jsonify({
        "message": "Registration successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "status": user.status
        }
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(user.id)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "status": user.status
        }
    }), 200