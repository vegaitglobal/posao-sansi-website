from modeltranslation.translator import TranslationOptions, register

from apps.users.models import ApplicantAccount, EmployerAccount


@register(ApplicantAccount)
class ApplicantAccountTranslationOptions(TranslationOptions):
    fields = (
        "about",
    )


@register(EmployerAccount)
class EmployerAccountTranslationOptions(TranslationOptions):
    fields = (
        "about",
    )
