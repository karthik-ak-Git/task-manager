from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    ma.init_app(app)
    CORS(app)

    # Import models to ensure they are registered with SQLAlchemy
    from app.models.task import Task
    from app.models.comment import Comment

    # Register blueprints
    from app.routes.tasks import task_bp
    from app.routes.comments import comment_bp

    app.register_blueprint(task_bp)
    app.register_blueprint(comment_bp)

    return app
