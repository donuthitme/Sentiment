from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'comment', 'sentiment', 'created_at']
        read_only_fields = ['user', 'sentiment', 'created_at']