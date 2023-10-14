from rest_framework.serializers import ModelSerializer

from apps.jobs.models import JobEnrollment

class JobEnrollmentSerializer(ModelSerializer):
    class Meta:
        models = JobEnrollment
        fields = "__all__"
