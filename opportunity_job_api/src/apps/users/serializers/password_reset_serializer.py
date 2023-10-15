from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from apps.users.utils import get_email_from_hash
from apps.users.models import User


class PasswordResetSerializer(serializers.Serializer):
    url_hash = serializers.CharField()
    password = serializers.CharField(validators=[MinLengthValidator(8)])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        try:
            email = get_email_from_hash(url_hash=attrs["url_hash"])
        except:
            raise serializers.ValidationError(_("Unable to retrieve an email address from the URL hash"))

        self.user = User.objects.filter(email=email).first()
        if not self.user:
            raise serializers.ValidationError(_("User does not exist"))
        return attrs
