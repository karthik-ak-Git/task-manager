from flask import Blueprint, request, jsonify
from app.schemas.task import TaskSchema
from app.services.task_service import *

task_bp = Blueprint("task_bp", __name__)
schema = TaskSchema()


@task_bp.route("/api/tasks", methods=["POST"])
def create():
    data = request.get_json()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400
    task = create_task(data)
    return jsonify(schema.dump(task)), 201


@task_bp.route("/api/tasks", methods=["GET"])
def read_all():
    tasks = get_all_tasks()
    return jsonify(schema.dump(tasks, many=True)), 200


@task_bp.route("/api/tasks/<int:task_id>", methods=["GET"])
def read(task_id):
    task = get_task_by_id(task_id)
    if task:
        return jsonify(schema.dump(task)), 200
    return jsonify({"error": "Task not found"}), 404


@task_bp.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update(task_id):
    data = request.get_json()
    task = update_task(task_id, data)
    if task:
        return jsonify(schema.dump(task)), 200
    return jsonify({"error": "Task not found"}), 404


@task_bp.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete(task_id):
    deleted = delete_task(task_id)
    if deleted:
        return jsonify({"msg": "Task deleted"}), 200
    return jsonify({"error": "Task not found"}), 404
