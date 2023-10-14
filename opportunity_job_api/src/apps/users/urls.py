from django.urls import path

from apps.users.views import LoginAPIView, RegisterApplicantAPIView, StatisticsAPIView

urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login"),
    path("register-applicant/", RegisterApplicantAPIView.as_view(), name="register_applicant"),
    path("statistics/", StatisticsAPIView.as_view(), name="statistics")
]
