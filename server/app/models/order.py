from datetime import datetime
from app.extensions import db

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    delivery_address = db.Column(db.Text, nullable=False)
    note = db.Column(db.Text)
    status = db.Column(db.String(30), default="pending")
    rider_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    items = db.relationship("OrderItem", backref="order", lazy=True, cascade="all, delete-orphan")
    delivery = db.relationship("Delivery", backref="order", uselist=False, cascade="all, delete-orphan")