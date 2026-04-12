
from flask import Blueprint, jsonify

rider_bp = Blueprint("rider_bp", __name__)

@rider_bp.route("/", methods=["GET"])
def placeholder_rider():
    return jsonify({"message": "Rider route ready"}), 200