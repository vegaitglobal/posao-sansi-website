from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import BaseModel
from apps.users.enums import EducationLevels, WorkExperienceLevels


class ApplicantAccount(BaseModel):
    class Meta:
        verbose_name = _("Applicant Account")
        verbose_name_plural = _("Applicant Accounts")

    type = "applicant"

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
        choices=WorkExperienceLevels.choices,
        default=WorkExperienceLevels.NONE,
    )
    education = models.CharField(
        verbose_name=_("education level"),
        max_length=14,
        choices=EducationLevels.choices,
        default=EducationLevels.NONE,
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
    )
