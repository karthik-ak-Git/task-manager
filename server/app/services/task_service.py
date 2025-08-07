from app.models.task import Task
from app import db


def create_task(data):
    task = Task(**data)
    db.session.add(task)
    db.session.commit()
    return task


def get_all_tasks():
    return Task.query.all()


def get_task_by_id(task_id):
    return Task.query.get(task_id)


def update_task(task_id, data):
    task = Task.query.get(task_id)
    if task:
        task.title = data.get("title", task.title)
        task.description = data.get("description", task.description)
        task.status = data.get("status", task.status)
        db.session.commit()
    return task


def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
    return task
