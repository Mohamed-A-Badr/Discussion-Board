from rest_framework import viewsets
from boards.models import Board, Topic, Post
from .serializers import BoardSerializer


# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
