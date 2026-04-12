from app.extensions import db
from datetime import datetime

class Delivery(db.Model):
    __tablename__ = "deliveries"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id', ondelete="CASCADE"), unique=True, nullable=False)
    rider_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="SET NULL"), nullable=True)
    pickup_status = db.Column(db.String(30), default="pending")
    delivery_status = db.Column(db.String(30), default="assigned")
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    picked_up_at = db.Column(db.DateTime)
    delivered_at = db.Column(db.DateTime)