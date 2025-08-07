from flask import Blueprint, request, jsonify
from app.schemas.comment import CommentSchema
from app.services.comment_service import *

comment_bp = Blueprint("comment_bp", __name__)
schema = CommentSchema()


@comment_bp.route("/api/comments", methods=["POST"])
def create():
    data = request.get_json()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400
    comment = create_comment(data)
    return jsonify(schema.dump(comment)), 201


@comment_bp.route("/api/comments/<int:task_id>", methods=["GET"])
def read(task_id):
    comments = get_comments_by_task(task_id)
    return jsonify(schema.dump(comments, many=True)), 200


@comment_bp.route("/api/comments/<int:comment_id>", methods=["PUT"])
def update(comment_id):
    data = request.get_json()
    comment = update_comment(comment_id, data)
    if comment:
        return jsonify(schema.dump(comment)), 200
    return jsonify({"error": "Not found"}), 404


@comment_bp.route("/api/comments/<int:comment_id>", methods=["DELETE"])
def delete(comment_id):
    deleted = delete_comment(comment_id)
    if deleted:
        return jsonify({"msg": "Deleted"}), 200
    return jsonify({"error": "Not found"}), 404
