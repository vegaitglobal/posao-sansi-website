from apps.common.views import ListCreateAPIView
from apps.jobs.filtersets import JobEnrollmentFilterSet
from apps.jobs.models import JobEnrollment
from apps.jobs.serializers import JobEnrollmentSerializer


class JobEnrollmentListCreateAPIView(ListCreateAPIView):
    queryset = JobEnrollment.objects.all()
    serializer_class = JobEnrollmentSerializer
    filterset_class = JobEnrollmentFilterSet
    model_class = JobEnrollment
