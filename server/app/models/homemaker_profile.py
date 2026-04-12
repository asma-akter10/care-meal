from app.extensions import db

class HomemakerProfile(db.Model):
    __tablename__ = "homemaker_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    bio = db.Column(db.Text)
    kitchen_address = db.Column(db.Text)
    approval_status = db.Column(db.String(20), default="pending")
    nid_number = db.Column(db.String(60))
    experience_years = db.Column(db.Integer, default=0)