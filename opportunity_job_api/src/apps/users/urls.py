from django.urls import path

from apps.users.views import (
    ApplicantRegistrationAPIView,
    EmployerRegistrationAPIView,
    LoginAPIView,
    LogoutAPIView,
    PasswordForgottenAPIView,
    StatisticsAPIView,
)

urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="login"),
    path("register-applicant/", ApplicantRegistrationAPIView.as_view(), name="register_applicant"),
    path("register-employer/", EmployerRegistrationAPIView.as_view(), name="register_employer"),
    path("statistics/", StatisticsAPIView.as_view(), name="statistics"),
    path("password-forgotten/", PasswordForgottenAPIView.as_view(), name="password_forgotten"),
]
