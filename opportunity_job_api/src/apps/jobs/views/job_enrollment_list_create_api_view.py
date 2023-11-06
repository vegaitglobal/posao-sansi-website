from django.db.models import QuerySet

from apps.common.views import ListCreateAPIView
from apps.jobs.filtersets import JobEnrollmentFilterSet
from apps.jobs.models import JobEnrollment
from apps.jobs.serializers import JobEnrollmentSerializer
from apps.users.permissions import IsApplicant


class JobEnrollmentListCreateAPIView(ListCreateAPIView):
    queryset = JobEnrollment.objects.all()
    serializer_class = JobEnrollmentSerializer
    filterset_class = JobEnrollmentFilterSet
    model_class = JobEnrollment
    permission_classes = [IsApplicant]

    def filter_queryset(self, queryset: QuerySet) -> QuerySet:
        queryset = super().filter_queryset(queryset=queryset)
        account = self.request.user.get_account()
        return queryset.filter(applicant_account=account)
