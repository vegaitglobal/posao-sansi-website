from django.contrib import admin
from django.db.models import QuerySet
from django.db.models.functions import Collate
from django.utils.translation import gettext_lazy as _

from apps.common.admin import TranslationAdmin
from apps.users.models import AbstractAccount


class AbstractAccountAdmin(TranslationAdmin):
    ordering = (
        "-modified",
    )

    @admin.display(description=_("is active"), boolean=True)
    def is_active(self, obj: AbstractAccount = None) -> bool:
        return obj.is_active if obj else False

    def get_search_fields(self, request) -> tuple:
        search_fields = tuple(super().get_search_fields(request=request))
        return search_fields + ("email_deterministic",)

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(
            email_deterministic=Collate("user__email", "und-x-icu")
        )
