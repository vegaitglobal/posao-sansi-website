from django.contrib import admin

from apps.users.admin.abstract_account_admin import AbstractAccountAdmin
from apps.users.models import ApplicantAccount


@admin.register(ApplicantAccount)
class ApplicantAccountAdmin(AbstractAccountAdmin):
    list_display = (
        "__str__",
        "is_active",
        "first_name",
        "last_name",
        "created",
        "modified",
    )
    search_fields = (
        "first_name",
        "last_name",
        "email_deterministic",
    )
    readonly_fields = (
        "is_active",
    )
