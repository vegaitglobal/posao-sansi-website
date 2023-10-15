from django.urls import path

from apps.jobs.views import FAQListView
from apps.jobs.views import JobOfferListCreateAPIView
from apps.jobs.views import JobOfferDetailsAPIView
from apps.jobs.views import JobEnrollmentListCreateAPIView

urlpatterns = [
    path("job-offers/", JobOfferListCreateAPIView.as_view()),
    path("job-offers/<int:pk>/", JobOfferDetailsAPIView.as_view()),
    path("job-enrollments/", JobEnrollmentListCreateAPIView.as_view(), name="job-enrollment"),
    path("faq/", FAQListView.as_view(), name="faq"),
]
