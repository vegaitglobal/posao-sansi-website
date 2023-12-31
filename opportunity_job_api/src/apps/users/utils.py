from django.conf import settings
from django.core import signing

from apps.users.models import ApplicantAccount, EmployerAccount, User
from apps.users.models.password_reset_email import PasswordResetEmail
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


def get_email_from_hash(url_hash: str) -> str:
    decoded_key = signing.loads(url_hash)
    return decoded_key.get("email")


def send_password_reset_email(user: User) -> None:
    email = PasswordResetEmail.objects.create(user=user)
    email.send()


def create_password_reset_email_context(email: str) -> dict[str, str]:
    url_hash = signing.dumps({"email": email})
    return {
        "password_reset_url": f"{settings.FE_APP_ORIGIN}/password-reset/{url_hash}/",
        "website_url": settings.FE_APP_ORIGIN,
        "website_name": settings.WEBSITE_NAME,
    }
