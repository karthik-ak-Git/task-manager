import unittest
from app import create_app, db
from app.models.comment import Comment


class CommentTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def test_create_comment(self):
        res = self.client.post("/api/comments", json={
            "task_id": 1,
            "content": "Test comment"
        })
        self.assertEqual(res.status_code, 201)

    def test_get_comments(self):
        self.client.post("/api/comments", json={
            "task_id": 2,
            "content": "Another comment"
        })
        res = self.client.get("/api/comments/2")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.get_json()), 1)

    def test_update_comment(self):
        self.client.post("/api/comments", json={
            "task_id": 3,
            "content": "To be updated"
        })
        res = self.client.put("/api/comments/1", json={"content": "Updated!"})
        self.assertEqual(res.status_code, 200)
        self.assertIn("Updated!", res.get_data(as_text=True))

    def test_delete_comment(self):
        self.client.post("/api/comments", json={
            "task_id": 4,
            "content": "To be deleted"
        })
        res = self.client.delete("/api/comments/1")
        self.assertEqual(res.status_code, 200)
