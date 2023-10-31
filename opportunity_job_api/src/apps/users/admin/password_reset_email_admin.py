from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.emails.admin import AbstractEmailAdmin
from apps.users.models.password_reset_email import PasswordResetEmail


@admin.register(PasswordResetEmail)
class PasswordResetEmailAdmin(AbstractEmailAdmin):
    list_display = (
        "__str__",
        "subject",
        "user",
        "modified",
        "colored_status",
        "category",
    )
    search_fields = (
        "user__email",
    )
    list_filter = (
        "status",
    )
    actions = (
        "send_emails",
    )
    fieldsets = (
        (None, {
            "fields": (
                "id",
                "subject",
                "user",
                "colored_status",
            )
        }),
        (_("Details"), {
            "fields": (
                "context",
                "template_path",
                "status",
                "error",
                "category",
            )
        },),
    )
