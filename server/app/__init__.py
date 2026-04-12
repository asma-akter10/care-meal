from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from .models import user, customer_profile, homemaker_profile, rider_profile, food_item, order, order_item, delivery, review
    from .routes.auth_routes import auth_bp
    from .routes.food_routes import food_bp
    from .routes.order_routes import order_bp
    from .routes.admin_routes import admin_bp
    from .routes.homemaker_routes import homemaker_bp
    from .routes.rider_routes import rider_bp
    from .routes.user_routes import user_bp
    from app.routes.order_routes import order_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(food_bp, url_prefix="/api/foods")
    app.register_blueprint(order_bp, url_prefix="/api/orders")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(homemaker_bp, url_prefix="/api/homemaker")
    app.register_blueprint(rider_bp, url_prefix="/api/rider")
    app.register_blueprint(user_bp, url_prefix="/api/users")

    @app.get("/")
    def home():
        return {"message": "Care Meal backend is running"}

    return app