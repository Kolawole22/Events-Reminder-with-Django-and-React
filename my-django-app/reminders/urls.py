from django.urls import path
from . import views

urlpatterns = [
    path('reminder-items', views.RemindersView.as_view()),
    path('reminder-items/<int:pk>', views.SingleReminderView.as_view()),
    path('login/', views.login, name='login'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
]
