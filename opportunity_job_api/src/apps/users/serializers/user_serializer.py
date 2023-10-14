from apps.common.serializers import ModelSerializer
from apps.users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = (
            "password",
            "groups",
            "user_permissions",
        )
