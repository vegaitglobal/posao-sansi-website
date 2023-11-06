from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.models import JobEnrollment
from apps.jobs.serializers import JobEnrollmentSerializer
from apps.users.permissions import IsApplicant


class JobEnrollmentDetailsAPIView(APIView):
    serializer_class = JobEnrollmentSerializer
    permission_classes = [IsApplicant]

    def delete(self, request, pk: int, **kwargs) -> Response:
        if job_enrollment := self._get_job_enrollment(pk=pk):
            job_enrollment.delete()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)

    def _get_job_enrollment(self, pk: int) -> JobEnrollment | None:
        try:
            job_enrollment = JobEnrollment.objects.get(id=pk)
        except JobEnrollment.DoesNotExist:
            return None

        account = self.request.user.get_account()
        if job_enrollment.applicant_account == account:
            return job_enrollment
