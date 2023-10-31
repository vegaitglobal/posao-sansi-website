from django.contrib import admin, messages
from django.core.handlers.wsgi import WSGIRequest
from django.db.models import QuerySet
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

from apps.common.admin import ModelAdmin
from apps.emails.models import Email
from apps.emails.utils import render_colored_email_status_html


class AbstractEmailAdmin(ModelAdmin, TranslationAdmin):
    list_filter = (
        "status",
    )
    actions = (
        "send_emails",
    )
    readonly_fields = (
        "colored_status",
    )

    def has_change_permission(self, request, obj: Email = None) -> bool:
        return False

    @admin.display(description=_("status"))
    def colored_status(self, obj: Email = None) -> str:
        return render_colored_email_status_html(email=obj) if obj else "-"

    @admin.action(description=_("Send selected emails"))
    def send_emails(self, request: WSGIRequest, queryset: QuerySet) -> None:
        emails_count = queryset.count()
        if emails_count <= 5:
            _do_send_emails(
                request=request,
                queryset=queryset
            )
        else:
            _display_send_emails_error_message(
                request=request,
                selected_emails_count=emails_count
            )


def _do_send_emails(request: WSGIRequest, queryset: QuerySet) -> None:
    emails_count = queryset.count()
    for email in queryset:
        email.send()
    message = _("Successfully sent {emails_count} {label}.").format(
        emails_count=emails_count,
        label=_("emails") if emails_count > 1 else _("email")
    )
    messages.success(
        request=request,
        message=message
    )


def _display_send_emails_error_message(request: WSGIRequest, selected_emails_count: int) -> None:
    message = _(
        "You can select a maximum of 5 emails to send at once. "
        "Please reduce the number of selected emails and try again."
    ).format(
        emails_count=selected_emails_count
    )
    messages.error(
        request=request,
        message=message
    )
