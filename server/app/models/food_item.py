from datetime import datetime
from app.extensions import db

class FoodItem(db.Model):
    __tablename__ = "food_items"

    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider_type = db.Column(db.String(20), default="homemaker")
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    calories = db.Column(db.Integer)
    diet_type = db.Column(db.String(50), nullable=False)
    disease_tag = db.Column(db.String(100))
    image_url = db.Column(db.Text)
    rating = db.Column(db.Float, default=0)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    order_items = db.relationship("OrderItem", backref="food_item", lazy=True, cascade="all, delete-orphan")