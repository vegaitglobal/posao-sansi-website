from apps.common.views import ListCreateAPIView
from apps.jobs.filtersets import JobEnrollmentFilterSet
from apps.jobs.models import JobEnrollment
from apps.jobs.serializers import JobEnrollmentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from apps.users.models import ApplicantAccount


class JobEnrollmentListCreateAPIView(ListCreateAPIView):
    queryset = JobEnrollment.objects.all()
    serializer_class = JobEnrollmentSerializer
    filterset_class = JobEnrollmentFilterSet
    model_class = JobEnrollment
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_account = request.user.get_account()
        if user_account and isinstance(user_account, ApplicantAccount):
            return super(JobEnrollmentListCreateAPIView, self).create(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)
