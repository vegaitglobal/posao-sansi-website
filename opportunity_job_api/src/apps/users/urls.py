from django.urls import path

from apps.users.views import (
    ApplicantRegistrationAPIView,
    EmployerRegistrationAPIView,
    StatisticsAPIView,
    LoginAPIView,
    LogoutAPIView
)

urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="login"),
    path("register-applicant/", ApplicantRegistrationAPIView.as_view(), name="register_applicant"),
    path("register-employer/", EmployerRegistrationAPIView.as_view(), name="register_employer"),
    path("statistics/", StatisticsAPIView.as_view(), name="statistics")
]
