from django.contrib import admin
from django.db.models import QuerySet
from django.db.models.functions import Collate
from django.utils.translation import gettext_lazy as _

from apps.emails.admin import AbstractEmailAdmin
from apps.users.models.password_reset_email import PasswordResetEmail


@admin.register(PasswordResetEmail)
class PasswordResetEmailAdmin(AbstractEmailAdmin):
    ordering = (
        "-modified",
    )
    list_display = (
        "__str__",
        "subject",
        "user",
        "modified",
        "colored_status",
        "category",
    )
    search_fields = (
        "email_deterministic",
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

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(email_deterministic=Collate("user__email", "und-x-icu"))
