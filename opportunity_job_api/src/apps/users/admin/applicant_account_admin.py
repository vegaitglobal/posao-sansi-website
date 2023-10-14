from django.contrib import admin
from django.db.models import QuerySet
from django.db.models.functions import Collate

from apps.common.admin import ModelAdmin
from apps.users.models import ApplicantAccount


@admin.register(ApplicantAccount)
class ApplicantAccountAdmin(ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "user",
    )
    search_fields = (
        "first_name",
        "last_name",
        "email_deterministic",
    )

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(
            email_deterministic=Collate("user__email", "und-x-icu")
        )
