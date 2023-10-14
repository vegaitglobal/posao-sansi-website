from django.http import JsonResponse
from rest_framework.views import APIView

from apps.users.models import ApplicantAccount, EmployerAccount


class StatisticsAPIView(APIView):
    @staticmethod
    def get(request) -> JsonResponse:
        applicant_count = ApplicantAccount.objects.count()
        employer_count = EmployerAccount.objects.count()
        return JsonResponse(data={"applicant_count": applicant_count, "employer_count": employer_count})
