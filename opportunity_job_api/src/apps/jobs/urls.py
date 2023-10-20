from django.urls import path

from apps.jobs.views import (
    FAQListView,
    JobEnrollmentDetailsAPIView,
    JobEnrollmentListCreateAPIView,
    JobOfferDetailsAPIView,
    JobOfferListCreateAPIView,
    TextChoicesFieldOptionsAPIView,
)

urlpatterns = [
    path("faq/", FAQListView.as_view(), name="faq"),
    path("job-offers/", JobOfferListCreateAPIView.as_view(), name="job_offer_list"),
    path("job-offers/<int:pk>/", JobOfferDetailsAPIView.as_view(), name="job_offer_details"),
    path("job-enrollments/", JobEnrollmentListCreateAPIView.as_view(), name="job_enrollment_list"),
    path("job-enrollments/<int:pk>/", JobEnrollmentDetailsAPIView.as_view(), name="job_enrollment_list"),
    path("text-choices-field-options/", TextChoicesFieldOptionsAPIView.as_view(), name="text_choices_field_options"),
]
