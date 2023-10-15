from django.urls import path

from apps.jobs.views import (
    FAQListView,
    JobEnrollmentListCreateAPIView,
    JobOfferDetailsAPIView,
    JobOfferListCreateAPIView,
    JobEnrollmentDetailsAPIView
)

urlpatterns = [
    path("job-offers/", JobOfferListCreateAPIView.as_view()),
    path("job-offers/<int:pk>/", JobOfferDetailsAPIView.as_view()),
    path("job-enrollments/", JobEnrollmentListCreateAPIView.as_view()),
    path("job-enrollments/<int:pk>/", JobEnrollmentDetailsAPIView.as_view()),
    path("faq/", FAQListView.as_view(), name="faq"),
]
