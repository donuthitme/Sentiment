from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet, register_user, user_info

router = DefaultRouter()
router.register(r'feedback', FeedbackViewSet, basename='feedback')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('user-info/', user_info),
]