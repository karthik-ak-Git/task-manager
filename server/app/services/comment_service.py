from app import db
from app.models.comment import Comment


def create_comment(data):
    comment = Comment(**data)
    db.session.add(comment)
    db.session.commit()
    return comment


def get_comments_by_task(task_id):
    return Comment.query.filter_by(task_id=task_id).all()


def update_comment(comment_id, data):
    comment = Comment.query.get(comment_id)
    if comment:
        comment.content = data.get('content', comment.content)
        db.session.commit()
    return comment


def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
    return comment
