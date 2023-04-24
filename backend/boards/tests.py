from django.test import TestCase
from .models import Board, Topic, Post
from django.contrib.auth.models import User

# Create your tests here.


class BoardTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(
            username="testuser",
            email="test@mail.com",
            password="mypassword",
        )
        cls.board = Board.objects.create(
            name="test board",
            description="test description",
        )
        cls.topic = Topic.objects.create(
            subject="test topic",
            board=cls.board,
            created_by=cls.user,
        )
        cls.post = Post.objects.create(
            content="test post",
            topic=cls.topic,
            created_by=cls.user,
        )

    def test_board_model(self):
        self.assertEqual(self.board.name, "test board")
        self.assertEqual(self.board.description, "test description")
        self.assertEqual(Board.objects.count(), 1)
        self.assertEqual(str(self.board), "test board")

    def test_topic_model(self):
        self.assertEqual(self.topic.subject, "test topic")
        self.assertEqual(str(self.topic.board), "test board")
        self.assertEqual(self.topic.created_by.username, "testuser")
        self.assertEqual(self.topic.created_by.email, "test@mail.com")
        self.assertEqual(Topic.objects.count(), 1)
        self.assertEqual(str(self.topic), "test topic")

    def test_post_model(self):
        self.assertEqual(self.post.content, "test post")
        self.assertEqual(str(self.post.topic), "test topic")
        self.assertEqual(self.post.created_by.username, "testuser")
        self.assertEqual(self.post.created_by.email, "test@mail.com")
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(str(self.post), "test post")
