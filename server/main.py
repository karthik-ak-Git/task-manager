from app import create_app, db
from flask import jsonify

app = create_app()


@app.route("/")
def index():
    return jsonify({"message": "Comment Management API is running 🚀"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
