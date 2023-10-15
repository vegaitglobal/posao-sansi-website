from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from apps.jobs.models import JobEnrollment
from apps.jobs.serializers import JobEnrollmentSerializer


class JobEnrollmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobEnrollment.objects.all()
    serializer_class = JobEnrollmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['applicant_account']
