from django.urls import path

from apps.jobs.views import FAQListView, JobOfferAPIView, JobOfferDetailsAPIView

urlpatterns = [
    path("job-offers/", JobOfferAPIView.as_view()),
    path("job-offers/<int:id>/", JobOfferDetailsAPIView.as_view()),
    path("faq/", FAQListView.as_view(), name="faq"),
]
