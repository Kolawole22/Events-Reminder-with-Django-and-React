from rest_framework import serializers
from .models import Reminder
from django.contrib.auth.models import User
from rest_framework.exceptions import PermissionDenied


class ReminderSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Reminder
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user

        if user.is_anonymous:
            raise PermissionDenied(
                "You must be authenticated to create a reminder.")

        validated_data['user'] = user
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extrakwargs = {'password': {'write_only': True}}
