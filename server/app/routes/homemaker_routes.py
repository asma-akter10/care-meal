from flask import Blueprint, jsonify

homemaker_bp = Blueprint("homemaker_bp", __name__)

@homemaker_bp.route("/", methods=["GET"])
def placeholder_homemaker():
    return jsonify({"message": "Homemaker route ready"}), 200