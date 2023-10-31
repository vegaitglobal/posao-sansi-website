from django.conf import settings
from django.db import models
from django.utils import translation
from django.utils.translation import gettext_lazy as _

from apps.emails.models import Email


class PasswordResetEmailManager(models.Manager):

    def create(self, *args, **kwargs) -> "PasswordResetEmail":
        from apps.users.utils import create_password_reset_email_context
        subject = _("Reset your password")
        kwargs.update({
            "subject": subject,
            "context": create_password_reset_email_context(email=kwargs["user"].email),
            "template_path": "emails/password_reset.html",
            "category": "password_reset"
        })
        with translation.override(language=settings.ENGLISH_LANG_SLUG):
            kwargs["subject_en"] = str(subject)
        with translation.override(language=settings.SERBIAN_LANG_SLUG):
            kwargs["subject_sr_latn"] = str(subject)
        return super().create(*args, **kwargs)


class PasswordResetEmail(Email):
    class Meta:
        verbose_name = _("Password Reset Email")
        verbose_name_plural = _("Password Reset Emails")

    objects = PasswordResetEmailManager()

    recipient = None
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        verbose_name=_("user"),
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.subject} | {self.user.email}'

    def get_recipients(self) -> list[str]:
        return [self.user.email]
