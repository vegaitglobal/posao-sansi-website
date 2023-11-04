from apps.common.serializers import ModelSerializer
from apps.jobs.models import JobOffer


class WriteJobOfferSerializer(ModelSerializer):
    class Meta:
        model = JobOffer
        fields = "__all__"
