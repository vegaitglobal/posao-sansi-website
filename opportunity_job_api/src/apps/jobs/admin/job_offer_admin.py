from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from apps.common.admin import TranslationAdmin
from apps.common.utils import get_model_admin_change_details_url
from apps.jobs.models import JobOffer


@admin.register(JobOffer)
class JobOfferAdmin(TranslationAdmin):
    list_display = (
        "job_name",
        "is_active",
        "company_name",
        "location",
        "application_deadline",
        "category"
    )
    list_filter = (
        "is_active",
    )
    search_fields = (
        "job_name",
        "job_description",
        "employer__company_name"
    )

    @admin.display(description=_("company name"))
    def company_name(self, obj: JobOffer = None) -> str:
        if obj:
            employer = obj.employer
            href = get_model_admin_change_details_url(obj=employer)
            return mark_safe(f'<a href="{href}">{employer.company_name}</a>')
        return "-"
