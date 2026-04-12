from app.extensions import db

class CustomerProfile(db.Model):
    __tablename__ = "customer_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    disease_name = db.Column(db.String(120))
    preferred_diet = db.Column(db.String(50))
    address = db.Column(db.Text)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))