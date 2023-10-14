from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from users.enums import Education, WorkExperience

from apps.common.models import BaseModel

TWO_MB_IN_BITES = 2 * 1024 * 1024


def file_size(value):
    limit = TWO_MB_IN_BITES
    if value.size > limit:
        raise ValidationError("File too large. Size should not exceed 2 MB.")


class ApplicantAccount(BaseModel):
    class Meta:
        verbose_name = _("Applicant Account")
        verbose_name_plural = _("Applicant Accounts")

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        verbose_name=_("user"),
        on_delete=models.CASCADE,
    )
    first_name = models.CharField(
        verbose_name=_("first name"),
        max_length=250,
    )
    last_name = models.CharField(
        verbose_name=_("last name"),
        max_length=250,
    )
    work_experience = models.CharField(
        verbose_name=_("work experience"),
        max_length=14,
        choices=WorkExperience.choices,
        default=WorkExperience.NONE,
        help_text=_("Work experience of the applicant"),
    )
    education = models.CharField(
        verbose_name=_("education level"),
        max_length=14,
        choices=Education.choices,
        default=Education.NONE,
        help_text=_("Education of the applicant"),
    )
    about = models.TextField(
        verbose_name=_("about me"),
        max_length=500,
        blank=True,
        null=True,
    )
    cv = models.FileField(
        upload_to="uploads/users/applicant_account/",
        blank=True,
        default=None,
        validators=[file_size],
    )
