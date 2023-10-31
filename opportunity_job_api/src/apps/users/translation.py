from modeltranslation.translator import TranslationOptions, register

from apps.emails.translation import EmailTranslationOptions
from apps.users.models import ApplicantAccount, EmployerAccount
from apps.users.models.password_reset_email import PasswordResetEmail


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


@register(PasswordResetEmail)
class PasswordResetEmailTranslationOptions(EmailTranslationOptions):
    pass
