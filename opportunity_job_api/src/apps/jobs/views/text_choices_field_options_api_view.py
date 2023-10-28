from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.enums import JobCategory, JobEngagement
from apps.users.enums import Education, WorkExperience
from apps.users.models import ApplicantAccount, EmployerAccount


class TextChoicesFieldOptionsAPIView(APIView):
    serializer_class = None

    def get(self, *args, **kwargs) -> Response:
        data = {
            "job_engagement": dict(JobEngagement.choices),
            "job_category": dict(JobCategory.choices),
            "education": dict(Education.choices),
            "work_experience": dict(WorkExperience.choices),
            "account_type": {
                ApplicantAccount.type: _("Applicant"),
                EmployerAccount.type: _("Employer"),
            }
        }
        return Response(data=data)
