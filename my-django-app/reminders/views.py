from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .models import Reminder
from .serializers import ReminderSerializer, UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.template.loader import render_to_string


# Create your views here.


class RemindersView(generics.ListCreateAPIView):

    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer


class SingleReminderView(generics.RetrieveUpdateAPIView, generics.DestroyAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer


@api_view(['POST'])
def login(request):
    # Perform login logic here (e.g., validate credentials)
    # If successful, generate and return JWT tokens
    # If unsuccessful, return an appropriate error response
    # Example:

    # Assuming you have validated the user's credentials
    user = authenticate(
        username=request.data['username'],
        password=request.data['password'])
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            # 'refresh': str(refresh)
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class SignUpView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            email = serializer.validated_data['email']
            # Create a new User object
            user = User.objects.create(
                username=username,
                password=make_password(password),
                email=email
            )
            return Response({'message': 'User registered successfully.'}, status=201)
        else:
            return Response(serializer.errors, status=400)


def send_event_reminder(reminder_id):
    try:
        reminder = Reminder.objects.get(id=reminder_id)
        event_time = reminder.datetime
        current_time = datetime.now()
        time_difference = event_time - current_time

        if time_difference.total_seconds() <= 3600:  # Check if the event is one hour away or less
            # Send email reminder to the user
            subject = f"Event Reminder: {reminder.title}"
            message = f"Your event '{reminder.title}' is scheduled at {event_time}. Don't forget to attend!"
            from_email = "event.calendar123@gmail.com"
            # Assuming the user has an email field
            to_email = [reminder.user.email]

            send_mail(subject, message, from_email, to_email)
    except Reminder.DoesNotExist:
        pass  # Handle the case when the reminder does not exist
