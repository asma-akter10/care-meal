from werkzeug.security import generate_password_hash
from app import create_app
from app.extensions import db
from app.models.user import User

app = create_app()

with app.app_context():
    existing_admin = User.query.filter_by(email="admin@caremeal.com").first()

    if existing_admin:
        print("Admin already exists")
    else:
        admin = User(
            name="Admin",
            email="admin@caremeal.com",
            password_hash=generate_password_hash("123456"),
            role="admin",
            status="active"
        )

        db.session.add(admin)
        db.session.commit()

        print("Admin created successfully")
        print("Email: admin@caremeal.com")
        print("Password: 123456")