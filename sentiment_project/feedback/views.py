from rest_framework import viewsets, permissions, status
from .models import Feedback
from .serializers import FeedbackSerializer
from .utils import analyze_sentiment
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()
    permission_classes = [IsAuthenticated]  # <== Add this line

    def perform_create(self, serializer):
        sentiment = analyze_sentiment(self.request.data['comment'])
        serializer.save(user=self.request.user, sentiment=sentiment)

@api_view(['POST'])
def register_user(request):
    try:
        User.objects.create_user(
            username=request.data['username'],
            password=request.data['password']
        )
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    except:
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    return Response({
        "username": request.user.username,
        "is_staff": request.user.is_staff
    })