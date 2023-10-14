from users.enums import WorkExperience, Education
from django.db import models

class ApplicantAccount(models.BaseModel):
    class Meta:
        verbose_name = _("Applicant Account")
        verbose_name_plural = _("Applicant Accounts")

    user = models.ForeignKey(
        "User",
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
        max_length=13,
        choices=WorkExperience.choices,
        default=WorkExperience.NONE,
        help_text=_("Work experience of the applicant"),
    )
    education = models.CharField(
        verbose_name=_("education level"),
        max_length=13,
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
        upload_to="uploads/users/applicant-account/",
        blank=True,
        default=None,
    )
