from django.contrib import admin
from apps.users.models import EmployerAccount
from apps.common.admin import ModelAdmin
from apps.common.utils import get_model_admin_change_details_url
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

@admin.register(EmployerAccount)
class ApplicantAccountUser(ModelAdmin):
    list_display = (
        "company_name",
        "email",
    )
    ordering = (
        "company_name",
    )
    search_fields = (
        "company_name",
        "email",
    )
    readonly_fields = (
        "email",
    )
    exclude = (
        "user",
    )

    @admin.display(description=_("user email"))
    def email(self, employerAccount: EmployerAccount = None) -> str:
        if employerAccount and employerAccount.user:
            href = get_model_admin_change_details_url(obj=employerAccount.user)
            return mark_safe(f'<a href="{href}">{employerAccount.user.email}</a>')

        return "-"