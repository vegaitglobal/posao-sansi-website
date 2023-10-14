from django.contrib import admin
from apps.users.models import ApplicantAccount
from apps.common.admin import ModelAdmin
from apps.common.utils import get_model_admin_change_details_url
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

@admin.register(ApplicantAccount)
class ApplicantAccountUser(ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email",
    )
    ordering = (
        "first_name",
        "last_name",
    )
    readonly_fields = (
        "email",
    )
    exclude = (
        "user",
    )

    @admin.display(description=_("user email"))
    def email(self, applicantAccount: ApplicantAccount = None) -> str:
        if applicantAccount and applicantAccount.user:
            href = get_model_admin_change_details_url(obj=applicantAccount.user)
            return mark_safe(f'<a href="{href}">{applicantAccount.user.email}</a>')

        return "-"