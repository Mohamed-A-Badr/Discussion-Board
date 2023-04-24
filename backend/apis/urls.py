from rest_framework.routers import DefaultRouter
from .views import BoardViewSet, TopicViewSet, PostViewSet
from django.urls import path, include

board_router = DefaultRouter()
board_router.register("boards", BoardViewSet, basename="boards")

topic_router = DefaultRouter()
topic_router.register("topics", TopicViewSet, basename="topics")

post_router = DefaultRouter()
post_router.register("posts", PostViewSet, basename="posts")

urlpatterns = [
    path("", include(board_router.urls)),
    path("boards/<int:board_id>/", include(topic_router.urls)),
    path("boards/<int:board_id>/topics/<int:topic_id>/", include(post_router.urls)),
]
