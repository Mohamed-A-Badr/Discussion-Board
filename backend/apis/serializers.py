from rest_framework import serializers
from boards.models import Board, Topic, Post
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ("id", "name", "description")


class TopicSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    created_dt = serializers.DateTimeField(format="%B %d, %Y %I:%M %p", required=False)

    class Meta:
        model = Topic
        fields = ("id", "subject", "created_by", "created_dt")

    def get_created_by(self, obj):
        user = obj.created_by
        serializer = UserSerializer(user)
        return serializer.data["username"]


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
