from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Board(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

    def get_topics_count(self):
        return Topic.objects.filter(board=self).count()

    def get_posts_count(self):
        return Post.objects.filter(topic__board=self).count()

    def get_last_post(self):
        return Post.objects.filter(topic__board=self).order_by("-created_dt").first()


class Topic(models.Model):
    subject = models.CharField(max_length=250)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_dt = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.subject

    def get_no_posts(self):
        return Post.objects.filter(topic=self).count()


class Post(models.Model):
    content = models.CharField(max_length=2000)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_dt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
