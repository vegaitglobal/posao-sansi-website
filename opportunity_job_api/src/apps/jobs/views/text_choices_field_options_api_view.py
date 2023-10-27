from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.enums import JobCategory, JobEngagement
from apps.users.enums import Education, WorkExperience


class TextChoicesFieldOptionsAPIView(APIView):
    serializer_class = None

    def get(self, *args, **kwargs) -> Response:
        data = {
            "job_engagement": dict(JobEngagement.choices),
            "job_category": dict(JobCategory.choices),
            "education": dict(Education.choices),
            "work_experience": dict(WorkExperience.choices),
        }
        return Response(data=data)
