from datetime import datetime
from app.extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    phone = db.Column(db.String(30))
    role = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer_profile = db.relationship("CustomerProfile", backref="user", uselist=False, cascade="all, delete-orphan")
    homemaker_profile = db.relationship("HomemakerProfile", backref="user", uselist=False, cascade="all, delete-orphan")
    rider_profile = db.relationship("RiderProfile", backref="user", uselist=False, cascade="all, delete-orphan")

    foods = db.relationship("FoodItem", backref="provider", lazy=True, cascade="all, delete-orphan")

    customer_orders = db.relationship(
        "Order",
        foreign_keys="Order.customer_id",
        backref="customer",
        lazy=True
    )

    rider_orders = db.relationship(
        "Order",
        foreign_keys="Order.rider_id",
        backref="rider",
        lazy=True
    )