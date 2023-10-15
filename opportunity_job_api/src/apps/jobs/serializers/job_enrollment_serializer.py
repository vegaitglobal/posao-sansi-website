from apps.common.serializers import ModelSerializer
from apps.jobs.models import JobEnrollment


class JobEnrollmentSerializer(ModelSerializer):
    class Meta:
        model = JobEnrollment
        fields = "__all__"
