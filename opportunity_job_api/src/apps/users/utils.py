from apps.users.models import ApplicantAccount, EmployerAccount, User
from apps.users.serializers import ApplicantAccountSerializer


def create_applicant_user(serializer: ApplicantAccountSerializer, password: str) -> User:
    user_kwargs = serializer.validated_data.pop("user")
    user_kwargs["password"] = password
    user = User.objects.create_user(**user_kwargs)
    ApplicantAccount.objects.create(user=user, **serializer.validated_data)

    return user


def get_applicant_count() -> int:
    count = ApplicantAccount.objects.count()
    return count


def get_employer_count() -> int:
    count = EmployerAccount.objects.count()
    return count
