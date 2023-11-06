from rest_framework.permissions import IsAuthenticated

from apps.users.models import EmployerAccount


class IsEmployer(IsAuthenticated):
    """
    Allows access only to authenticated users
    with EmployerAccount only.
    """

    def has_permission(self, request, view):
        has_permission = super().has_permission(request=request, view=view)
        if has_permission and (account := request.user.get_account()):
            return account.type == EmployerAccount.type
        return False
