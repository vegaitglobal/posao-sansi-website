from django.contrib import admin

from apps.common.admin import TranslationAdmin
from apps.jobs.models import FAQ


@admin.register(FAQ)
class FAQAdmin(TranslationAdmin):
    list_display = (
        "question",
        "display_to_anonymous",
        "display_to_employers",
        "display_to_applicants",
    )
    list_filter = (
        "display_to_anonymous",
        "display_to_employers",
        "display_to_applicants",
    )
    search_fields = (
        "question",
        "answer",
    )
