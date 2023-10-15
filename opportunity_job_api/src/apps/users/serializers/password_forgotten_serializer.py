from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from apps.users.models import User


class PasswordForgottenSerializer(serializers.Serializer):
    email = serializers.CharField()

    def __init__(self, *args, **kwargs):
        super(PasswordForgottenSerializer, self).__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        self.user = User.objects.filter(email=attrs["email"]).first()
        if not self.user:
            raise serializers.ValidationError({"email": _("Invalid email address")})

        return attrs
