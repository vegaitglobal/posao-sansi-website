from rest_framework.permissions import IsAuthenticated


class HasAccount(IsAuthenticated):
    """
    Allows access only to authenticated users
    with an account.
    """

    def has_permission(self, request, view):
        has_permission = super().has_permission(request=request, view=view)
        return bool(has_permission and request.user.get_account())
