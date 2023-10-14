from django.contrib import admin

from apps.common.admin import ModelAdmin
from apps.jobs.models import JobOffer
from django.db.models import QuerySet
from django.db.models.functions import Collate
from apps.common.utils import get_model_admin_change_details_url
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _


@admin.register(JobOffer)
class JobOfferAdmin(ModelAdmin):
    list_display = (
        "job_name",
        "company_name",
        "location",
        "application_deadline",
        "category"
    )
    list_filter = (
       "location",
       "category"
    )
    search_fields = (
       "job_name",
       "job_description",
       "company_name_deterministic"
    )

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(
            company_name_deterministic=Collate("employer__company_name", "und-x-icu")
        )

    @admin.display(description=_("company name"))
    def company_name(self, obj: JobOffer = None) -> str:
        if obj:
            employer = obj.employer
            href = get_model_admin_change_details_url(obj=employer)
            return mark_safe(f'<a href="{href}">{employer.company_name}</a>')
        return "-"

