from django.contrib import admin

from apps.users.admin.abstract_account_admin import AbstractAccountAdmin
from apps.users.models import EmployerAccount


@admin.register(EmployerAccount)
class EmployerAccountAdmin(AbstractAccountAdmin):
    list_display = (
        "__str__",
        "is_active",
        "company_name",
        "created",
        "modified",
    )
    search_fields = (
        "company_name",
        "email_deterministic",
    )
    readonly_fields = (
        "is_active",
    )
