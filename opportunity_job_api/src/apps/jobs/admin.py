from django import forms
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.common.admin import ModelAdmin
from apps.jobs.models import FAQ

class FAQForm(forms.ModelForm):
    class Meta:
        model = FAQ
        fields = [
            "question",
            "answer",
            "display_to_anonymous",
            "display_to_employers",
            "display_to_applicants",
        ]


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = (
        "question",
        "answer",
        "display_to_anonymous",
        "display_to_employers",
        "display_to_applicants",
    )

    search_fields = (
        "question",
        "answer",
        "display_to_anonymous",
        "display_to_employers",
        "display_to_applicants",
    )

    fieldsets = (
        (None, {
            "fields": (
                "question",
                "answer",
                "display_to_anonymous",
                "display_to_employers",
                "display_to_applicants",
            )
        }),
    )
