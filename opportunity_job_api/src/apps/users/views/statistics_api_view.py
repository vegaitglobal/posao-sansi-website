from django.http import JsonResponse
from rest_framework.views import APIView

from apps.users.models import ApplicantAccount, EmployerAccount


class StatisticsAPIView(APIView):
    serializer_class = None

    @staticmethod
    def get(request) -> JsonResponse:
        applicant_count = ApplicantAccount.objects.filter(user__is_active=True).count()
        employer_count = EmployerAccount.objects.filter(user__is_active=True).count()
        return JsonResponse(data={"applicant_count": applicant_count, "employer_count": employer_count})
