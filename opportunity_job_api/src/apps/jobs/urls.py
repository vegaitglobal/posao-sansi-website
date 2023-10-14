from django.urls import path

from apps.jobs.views import FAQListView, JobOfferListAPIView, JobOfferDetailsAPIView

urlpatterns = [
    path("job-offers/", JobOfferListAPIView.as_view()),
    path("job-offers/<int:id>/", JobOfferDetailsAPIView.as_view()),
    path("faq/", FAQListView.as_view(), name="faq"),
]
