from app.extensions import db

class RiderProfile(db.Model):
    _tablename_ = "rider_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    vehicle_type = db.Column(db.String(50))
    license_number = db.Column(db.String(80))
    availability_status = db.Column(db.String(20), default="available")
