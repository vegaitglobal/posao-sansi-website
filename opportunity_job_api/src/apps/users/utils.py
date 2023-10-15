from django.conf import settings
from django.core import signing
from django.utils.translation import gettext_lazy as _

from apps.emails.models import Email
from apps.users.models import ApplicantAccount, EmployerAccount, User
from apps.users.serializers import ApplicantAccountSerializer, EmployerAccountSerializer


def create_applicant_user(serializer: ApplicantAccountSerializer, password: str) -> User:
    user_kwargs = serializer.validated_data.pop("user")
    user_kwargs["password"] = password
    user = User.objects.create_user(**user_kwargs)
    ApplicantAccount.objects.create(user=user, **serializer.validated_data)

    return user


def create_employer_user(serializer: EmployerAccountSerializer, password: str) -> User:
    user_kwargs = serializer.validated_data.pop("user")
    user_kwargs["password"] = password
    user = User.objects.create_user(**user_kwargs)
    EmployerAccount.objects.create(user=user, **serializer.validated_data)
    return user


def send_password_reset_email(email: str) -> None:
    url_hash = signing.dumps({"email": email})
    email_context = {
        "password_reset_url": f"{settings.FE_APP_ORIGIN}/password-reset/{url_hash}/",
        "website_url": settings.FE_APP_ORIGIN,
    }
    email_thread = Email.objects.create(
        subject=_("Reset your password"),
        recipient=email,
        context=email_context,
        template_path="emails/password_reset.html",
        category="password_reset",
    )
    email_thread.send()
