from django.utils.translation import gettext_lazy as _
from django.utils.timezone import now
from rest_framework.exceptions import ValidationError

from apps.common.serializers import ModelSerializer
from apps.jobs.models import JobOffer


class WriteJobOfferSerializer(ModelSerializer):
    class Meta:
        model = JobOffer
        fields = "__all__"

    def validate(self, attrs) -> dict:
        validated_data = super().validate(attrs=attrs)
        if validated_data["application_deadline"] < now():
            raise ValidationError(
                {"application_deadline": _("Application deadline must be in the future")}
            )
        return validated_data
