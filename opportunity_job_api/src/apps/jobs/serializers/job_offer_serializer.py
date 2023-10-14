from rest_framework.serializers import ModelSerializer
from apps.jobs.models import JobOffer

class JobOfferSerializer(ModelSerializer):
    class Meta:
        model = JobOffer
        fields = "__all__"