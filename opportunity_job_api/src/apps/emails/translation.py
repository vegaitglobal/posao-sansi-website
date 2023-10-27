from modeltranslation.translator import TranslationOptions, register

from apps.emails.models import Email


@register(Email)
class EmailTranslationOptions(TranslationOptions):
    fields = (
        "subject",
    )
