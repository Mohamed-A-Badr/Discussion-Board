from rest_framework import serializers
from boards.models import Board, Topic, Post
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    created_dt = serializers.DateTimeField(format="%B %d, %Y %I:%M %p", required=False)

    class Meta:
        model = Post
        fields = ("id", "content", "created_by", "created_dt")

    def get_created_by(self, obj):
        user = obj.created_by
        serializer = UserSerializer(user)
        return serializer.data["username"]


class BoardSerializer(serializers.ModelSerializer):
    no_topics = serializers.SerializerMethodField()
    no_posts = serializers.SerializerMethodField()
    last_post = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ("id", "name", "description", "no_topics", "no_posts", "last_post")

    def get_no_topics(self, obj):
        return obj.get_topics_count()

    def get_no_posts(self, obj):
        return obj.get_posts_count()

    def get_last_post(self, obj):
        last_post = obj.get_last_post()
        if last_post:
            serializer = PostSerializer(last_post)
            return serializer.data["created_dt"]
        return "No Posts"


class TopicSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    created_dt = serializers.DateTimeField(format="%B %d, %Y %I:%M %p", required=False)
    no_posts = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = ("id", "subject", "created_by", "created_dt", "no_posts")

    def get_created_by(self, obj):
        user = obj.created_by
        serializer = UserSerializer(user)
        return serializer.data["username"]

    def get_no_posts(self, obj):
        return obj.get_no_posts()
