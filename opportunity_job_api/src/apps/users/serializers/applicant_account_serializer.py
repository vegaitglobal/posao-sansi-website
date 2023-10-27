from rest_framework.fields import SerializerMethodField

from apps.common.serializers import ModelSerializer
from apps.users.models import ApplicantAccount
from apps.users.serializers import UserSerializer


class ApplicantAccountSerializer(ModelSerializer):
    user = UserSerializer()

    work_experience = SerializerMethodField()
    education = SerializerMethodField()

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

    @staticmethod
    def get_work_experience(obj: ApplicantAccount) -> str:
        return obj.get_work_experience_display()

    @staticmethod
    def get_education(obj: ApplicantAccount) -> str:
        return obj.get_education_display()
