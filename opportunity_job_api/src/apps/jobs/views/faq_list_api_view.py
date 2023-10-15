from rest_framework import generics

from apps.jobs.models import FAQ
from apps.jobs.serializers import FAQSerializer


class FAQListView(generics.ListAPIView):
    serializer_class = FAQSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return FAQ.objects.filter(display_to_anonymous=True)

        if user.get_account().type == "applicant":
            return FAQ.objects.filter(display_to_applicants=True)

        if user.get_account().type == "employer":
            return FAQ.objects.filter(display_to_employers=True)

        return FAQ.objects.all()
