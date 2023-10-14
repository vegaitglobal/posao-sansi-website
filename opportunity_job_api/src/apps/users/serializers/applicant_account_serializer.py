from apps.common.serializers import ModelSerializer
from apps.users.models import ApplicantAccount
from apps.users.serializers import UserSerializer


class ApplicantAccountSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ApplicantAccount
        fields = (
            "user",
            "first_name",
            "last_name",
            "work_experience",
            "education",
            "about",
        )
