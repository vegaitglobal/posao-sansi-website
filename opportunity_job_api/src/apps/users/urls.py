from django.urls import path

from apps.users.views import (
    ApplicantRegistrationAPIView,
    EmployerRegistrationAPIView,
    LoginAPIView,
)

urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login"),
    path("register-applicant/", ApplicantRegistrationAPIView.as_view(), name="register_applicant"),
    path("register-employer/", EmployerRegistrationAPIView.as_view(), name="register_employer")
]
