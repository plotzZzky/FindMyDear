from rest_framework import routers

from .views import CommentView

comments_router = routers.DefaultRouter()
comments_router.register(r'comments', CommentView, basename='comments')
