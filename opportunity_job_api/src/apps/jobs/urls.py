from django.urls import path

from apps.jobs.views import FAQListView
from apps.jobs.views import JobOfferListAPIView
from apps.jobs.views import JobOfferDetailsAPIView
from apps.jobs.views import JobEnrollmentListAPIView

urlpatterns = [
    path("job-offers/", JobOfferListAPIView.as_view()),
    path("job-offers/<int:id>/", JobOfferDetailsAPIView.as_view()),
    path("job-enrollments/", JobEnrollmentListAPIView.as_view(), name="job-enrollment"),
    path("faq/", FAQListView.as_view(), name="faq"),
]
