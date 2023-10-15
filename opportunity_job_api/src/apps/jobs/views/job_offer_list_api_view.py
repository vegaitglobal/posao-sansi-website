from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer


class JobOfferListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_active', 'employer']
