from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.food_item import FoodItem
from app.models.homemaker_profile import HomemakerProfile
from app.utils.decorators import token_required, roles_required

food_bp = Blueprint("food_bp", __name__)

@food_bp.route("/", methods=["GET"])
def get_foods():
    search = request.args.get("search", "").strip()
    diet_type = request.args.get("diet_type", "").strip()

    query = FoodItem.query.filter_by(is_available=True)

    if search:
        query = query.filter(FoodItem.title.ilike(f"%{search}%"))

    if diet_type:
        query = query.filter(FoodItem.diet_type == diet_type)

    foods = query.order_by(FoodItem.created_at.desc()).all()

    return jsonify([
        {
            "id": food.id,
            "title": food.title,
            "description": food.description,
            "price": float(food.price),
            "calories": food.calories,
            "diet_type": food.diet_type,
            "disease_tag": food.disease_tag,
            "image_url": food.image_url,
            "rating": food.rating,
            "provider_id": food.provider_id,
            "provider_name": food.provider.name if food.provider else "Unknown",
            "provider_type": food.provider_type,
            "is_available": food.is_available
        }
        for food in foods
    ]), 200

@food_bp.route("/<int:food_id>", methods=["GET"])
def get_food(food_id):
    food = FoodItem.query.get_or_404(food_id)

    return jsonify({
        "id": food.id,
        "title": food.title,
        "description": food.description,
        "price": float(food.price),
        "calories": food.calories,
        "diet_type": food.diet_type,
        "disease_tag": food.disease_tag,
        "image_url": food.image_url,
        "rating": food.rating,
        "provider_id": food.provider_id,
        "provider_name": food.provider.name if food.provider else "Unknown",
        "provider_type": food.provider_type,
        "is_available": food.is_available
    }), 200

@food_bp.route("/", methods=["POST"])
@token_required
@roles_required("homemaker")
def create_food(current_user):
    data = request.get_json() or {}

    profile = HomemakerProfile.query.filter_by(user_id=current_user.id).first()
    if not profile or profile.approval_status != "approved":
        return jsonify({"message": "Your homemaker account is not approved yet"}), 403

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    price = data.get("price")
    calories = data.get("calories")
    diet_type = data.get("diet_type", "").strip()
    disease_tag = data.get("disease_tag", "").strip()
    image_url = data.get("image_url", "").strip()
    rating = data.get("rating", 0)

    if not title or price is None or not diet_type:
        return jsonify({"message": "Title, price, and category are required"}), 400

    food = FoodItem(
        provider_id=current_user.id,
        provider_type="homemaker",
        title=title,
        description=description,
        price=price,
        calories=calories,
        diet_type=diet_type,
        disease_tag=disease_tag,
        image_url=image_url,
        rating=rating,
        is_available=True
    )

    db.session.add(food)
    db.session.commit()

    return jsonify({"message": "Food created successfully"}), 201

@food_bp.route("/mine", methods=["GET"])
@token_required
@roles_required("homemaker")
def get_my_foods(current_user):
    foods = FoodItem.query.filter_by(provider_id=current_user.id).order_by(FoodItem.created_at.desc()).all()

    return jsonify([
        {
            "id": food.id,
            "title": food.title,
            "description": food.description,
            "price": float(food.price),
            "calories": food.calories,
            "diet_type": food.diet_type,
            "disease_tag": food.disease_tag,
            "image_url": food.image_url,
            "rating": food.rating,
            "is_available": food.is_available
        }
        for food in foods
    ]), 200

@food_bp.route("/<int:food_id>", methods=["DELETE"])
@token_required
@roles_required("homemaker")
def delete_food(current_user, food_id):
    food = FoodItem.query.get_or_404(food_id)

    if food.provider_id != current_user.id:
        return jsonify({"message": "You can delete only your own foods"}), 403

    db.session.delete(food)
    db.session.commit()

    return jsonify({"message": "Food deleted successfully"}), 200

# from flask import Blueprint, jsonify, request
# from app.extensions import db
# from app.models.food_item import FoodItem
# from app.utils.decorators import token_required, roles_required
# from app.models.homemaker_profile import HomemakerProfile

# food_bp = Blueprint("food_bp", __name__)

# @food_bp.route("/", methods=["GET"])
# def get_foods():
#     foods = FoodItem.query.filter_by(is_available=True).order_by(FoodItem.created_at.desc()).all()

#     return jsonify([
#         {
#             "id": food.id,
#             "title": food.title,
#             "description": food.description,
#             "price": float(food.price),
#             "calories": food.calories,
#             "diet_type": food.diet_type,
#             "disease_tag": food.disease_tag,
#             "image_url": food.image_url,
#             "provider_id": food.provider_id,
#             "provider_type": food.provider_type,
#             "is_available": food.is_available
#         }
#         for food in foods
#     ]), 200

# @food_bp.route("/<int:food_id>", methods=["GET"])
# def get_food(food_id):
#     food = FoodItem.query.get_or_404(food_id)

#     return jsonify({
#         "id": food.id,
#         "title": food.title,
#         "description": food.description,
#         "price": float(food.price),
#         "calories": food.calories,
#         "diet_type": food.diet_type,
#         "disease_tag": food.disease_tag,
#         "image_url": food.image_url,
#         "provider_id": food.provider_id,
#         "provider_type": food.provider_type,
#         "is_available": food.is_available
#     }), 200

# @food_bp.route("/", methods=["POST"])
# @token_required
# @roles_required("homemaker")
# def create_food(current_user):
#     data = request.get_json() or {}
#     profile = HomemakerProfile.query.filter_by(user_id=current_user.id).first()

#     if not profile or profile.approval_status != "approved":
#         return jsonify({"message": "Your homemaker account is not approved yet"}), 403

#     title = data.get("title", "").strip()
#     description = data.get("description", "").strip()
#     price = data.get("price")
#     calories = data.get("calories")
#     diet_type = data.get("diet_type", "").strip()
#     disease_tag = data.get("disease_tag", "").strip()
#     image_url = data.get("image_url", "").strip()

#     if not title or price is None or not diet_type:
#         return jsonify({"message": "Title, price, and diet type are required"}), 400

#     food = FoodItem(
#         provider_id=current_user.id,
#         provider_type="homemaker",
#         title=title,
#         description=description,
#         price=price,
#         calories=calories,
#         diet_type=diet_type,
#         disease_tag=disease_tag,
#         image_url=image_url,
#         is_available=True
#     )

#     db.session.add(food)
#     db.session.commit()

#     return jsonify({"message": "Food created successfully"}), 201

# @food_bp.route("/mine", methods=["GET"])
# @token_required
# @roles_required("homemaker")
# def get_my_foods(current_user):
#     foods = FoodItem.query.filter_by(provider_id=current_user.id).order_by(FoodItem.created_at.desc()).all()

#     return jsonify([
#         {
#             "id": food.id,
#             "title": food.title,
#             "description": food.description,
#             "price": float(food.price),
#             "calories": food.calories,
#             "diet_type": food.diet_type,
#             "disease_tag": food.disease_tag,
#             "image_url": food.image_url,
#             "is_available": food.is_available
#         }
#         for food in foods
#     ]), 200

# @food_bp.route("/<int:food_id>", methods=["DELETE"])
# @token_required
# @roles_required("homemaker")
# def delete_food(current_user, food_id):
#     food = FoodItem.query.get_or_404(food_id)

#     if food.provider_id != current_user.id:
#         return jsonify({"message": "You can delete only your own foods"}), 403

#     db.session.delete(food)
#     db.session.commit()

#     return jsonify({"message": "Food deleted successfully"}), 200