from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.enums import JobCategories, JobEngagements
from apps.users.enums import EducationLevels, WorkExperienceLevels
from apps.users.models import ApplicantAccount, EmployerAccount


class TextChoicesFieldOptionsAPIView(APIView):
    serializer_class = None

    def get(self, *args, **kwargs) -> Response:
        data = {
            "job_engagement": dict(JobEngagements.choices),
            "job_category": dict(JobCategories.choices),
            "education": dict(EducationLevels.choices),
            "work_experience": dict(WorkExperienceLevels.choices),
            "account_type": {
                ApplicantAccount.type: _("Applicant"),
                EmployerAccount.type: _("Employer"),
            }
        }
        return Response(data=data)
