from django.contrib import admin
from django.db.models import QuerySet
from django.db.models.functions import Collate

from apps.common.admin import ModelAdmin
from apps.users.models import EmployerAccount


@admin.register(EmployerAccount)
class EmployerAccountAdmin(ModelAdmin):
    list_display = (
        "company_name",
        "user",
    )
    search_fields = (
        "company_name",
        "email_deterministic",
    )

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(
            email_deterministic=Collate("user__email", "und-x-icu")
        )
