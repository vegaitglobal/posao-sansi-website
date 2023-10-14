from apps.common.serializers import ModelSerializer
from apps.jobs.models import FAQ


class FAQSerializer(ModelSerializer):

    class Meta:
        model = FAQ
        fields = "__all__"
