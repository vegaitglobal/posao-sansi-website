from django.urls import path

from apps.jobs.views import (
    JobOfferAPIView,
    JobOfferDetailsAPIView,
)

urlpatterns = [
    path("job-offers/", JobOfferAPIView.as_view()),
    path("job-offers/<int:id>/", JobOfferDetailsAPIView.as_view()),
]
