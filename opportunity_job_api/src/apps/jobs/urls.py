from django.urls import path

from apps.jobs.views import FAQListView

urlpatterns = [
    path("faq/", FAQListView.as_view(), name="faq"),
]
