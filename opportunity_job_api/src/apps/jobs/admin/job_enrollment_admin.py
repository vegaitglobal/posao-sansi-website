from django.contrib import admin
from django.db.models import QuerySet
from django.db.models.functions import Collate
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from apps.common.admin import ModelAdmin
from apps.common.utils import get_model_admin_change_details_url
from apps.jobs.models import JobEnrollment


@admin.register(JobEnrollment)
class JobEnrollmentAdmin(ModelAdmin):
    ordering = (
        "is_pending",
        "-modified",
    )
    list_display = (
        "__str__",
        "is_pending",
        "job_name",
        "company_name",
        "applicant_email",
        "created",
        "modified",
    )
    list_filter = (
        "is_pending",
    )
    search_fields = (
        "job_offer__job_name",
        "job_offer__employer__company_name",
        "applicant_email_deterministic"
    )

    @admin.display(description=_("job name"))
    def job_name(self, obj: JobEnrollment = None) -> str:
        if not obj:
            return "-"

        job_offer = obj.job_offer
        href = get_model_admin_change_details_url(obj=job_offer)
        return mark_safe(f'<a href="{href}">{job_offer.job_name}</a>')

    @admin.display(description=_("company name"))
    def company_name(self, obj: JobEnrollment = None) -> str:
        if not obj:
            return "-"

        job_offer = obj.job_offer
        href = get_model_admin_change_details_url(obj=job_offer.employer)
        return mark_safe(f'<a href="{href}">{job_offer.employer.company_name}</a>')

    @admin.display(description=_("applicant_email"))
    def applicant_email(self, obj: JobEnrollment = None) -> str:
        if not obj:
            return "-"

        applicant_account = obj.applicant_account
        href = get_model_admin_change_details_url(obj=applicant_account.user)
        return mark_safe(f'<a href="{href}">{applicant_account.user.email}</a>')

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(
            applicant_email_deterministic=Collate("applicant_account__user__email", "und-x-icu")
        )
