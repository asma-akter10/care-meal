from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.food_item import FoodItem
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    provider = User.query.filter_by(email="provider@caremeal.com").first()

    if not provider:
        provider = User(
            name="Care Meal Provider",
            email="provider@caremeal.com",
            password_hash=generate_password_hash("123456"),
            role="homemaker",
            status="active",
        )
        db.session.add(provider)
        db.session.commit()

    foods = [
        {
            "title": "Diabetic Meal",
            "description": "Healthy diabetic-friendly meal.",
            "price": 250,
            "calories": 420,
            "diet_type": "DIABETIC",
            "disease_tag": "Diabetes",
            "image_url": "https://images.unsplash.com/photo-1547592180-85f173990554",
        },
        {
            "title": "Low Salt Food",
            "description": "Low sodium healthy dish.",
            "price": 220,
            "calories": 380,
            "diet_type": "LOW_SALT",
            "disease_tag": "Heart Care",
            "image_url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        },
        {
            "title": "Healthy Bowl",
            "description": "Fresh bowl with balanced nutrition.",
            "price": 300,
            "calories": 450,
            "diet_type": "HEALTHY",
            "disease_tag": "General",
            "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        },
    ]

    for item in foods:
        exists = FoodItem.query.filter_by(title=item["title"]).first()
        if not exists:
            food = FoodItem(
                provider_id=provider.id,
                provider_type="homemaker",
                title=item["title"],
                description=item["description"],
                price=item["price"],
                calories=item["calories"],
                diet_type=item["diet_type"],
                disease_tag=item["disease_tag"],
                image_url=item["image_url"],
                is_available=True,
            )
            db.session.add(food)

    db.session.commit()
    print("Seed data inserted successfully.")