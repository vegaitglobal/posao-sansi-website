from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.models import JobEnrollment
from apps.jobs.serializers import JobEnrollmentSerializer

from apps.users.models import EmployerAccount


class JobEnrollmentDetailsAPIView(APIView):
    serializer_class = JobEnrollmentSerializer
    permission_classes = [IsAuthenticated]

    @staticmethod
    def delete(request, pk: int, **kwargs):
        if user_account := request.user.get_account():
            if isinstance(user_account, EmployerAccount):
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


        if job_enrollment := JobEnrollment.objects.filter(id=pk).filter():
            job_enrollment.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
