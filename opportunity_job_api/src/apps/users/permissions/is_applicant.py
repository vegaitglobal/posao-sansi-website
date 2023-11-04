from rest_framework.permissions import IsAuthenticated

from apps.users.models import ApplicantAccount


class IsApplicant(IsAuthenticated):
    """
    Allows access only to authenticated users
    with ApplicantAccount only.
    """

    def has_permission(self, request, view):
        has_permission = super().has_permission(request=request, view=view)
        if has_permission and (account := request.user.get_account()):
            return account.type == ApplicantAccount.type
        return False
