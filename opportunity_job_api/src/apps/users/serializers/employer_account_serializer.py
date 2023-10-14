from apps.common.serializers import ModelSerializer
from apps.users.models import EmployerAccount
from apps.users.serializers import UserSerializer


class EmployerAccountSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = EmployerAccount
        fields = (
            "user",
            "company_name",
            "pib",
            "address",
            "phone_number",
            "url",
            "about",
        )
