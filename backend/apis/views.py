from rest_framework import viewsets, permissions
from .serializers import BoardSerializer, TopicSerializer, PostSerializer
from boards.models import Board, Topic, Post
from django.shortcuts import get_object_or_404
from .permissions import IsAuthorOrReadOnly


# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = (
        IsAuthorOrReadOnly,
        permissions.IsAdminUser,
    )
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class TopicViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = TopicSerializer

    def get_queryset(self):
        try:
            board_id = self.kwargs.get("board_id")
            board = get_object_or_404(Board, pk=board_id)
            return Topic.objects.filter(board=board)
        except Topic.DoesNotExist:
            return Topic.objects.none()

    def perform_create(self, serializer):
        board_id = self.kwargs.get("board_id")
        board = get_object_or_404(Board, pk=board_id)
        serializer.save(board=board, created_by=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = PostSerializer

    def get_queryset(self):
        try:
            board_id = self.kwargs.get("board_id")
            topic_id = self.kwargs.get("topic_id")
            topic = get_object_or_404(Topic, board__pk=board_id, pk=topic_id)
            return Post.objects.filter(topic=topic)
        except Post.DoesNotExist:
            return Post.objects.none()

    def perform_create(self, serializer):
        board_id = self.kwargs.get("board_id")
        topic_id = self.kwargs.get("topic_id")
        topic = get_object_or_404(Topic, board__pk=board_id, pk=topic_id)
        serializer.save(topic=topic, created_by=self.request.user)
