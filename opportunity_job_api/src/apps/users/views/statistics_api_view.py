from django.http import JsonResponse
from rest_framework.views import APIView

from apps.users.utils import get_applicant_count, get_employer_count


class StatisticsAPIView(APIView):
    @staticmethod
    def get(request, **kwargs) -> JsonResponse:
        applicant_count = get_applicant_count()
        employer_count = get_employer_count()
        return JsonResponse(data={"applicant_count": applicant_count, "employer_count": employer_count})
