from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import BaseModel
from apps.jobs.enums import JobCategories, JobEngagements
from apps.users.enums import EducationLevels, WorkExperienceLevels


class JobOffer(BaseModel):
    class Meta:
        verbose_name = _("Job Offer")
        verbose_name_plural = _("Job Offers")

    job_name = models.CharField(
        verbose_name=_("job name"),
        max_length=250,
    )
    job_description = models.TextField(
        verbose_name=_("job description"),
    )
    employer = models.ForeignKey(
        verbose_name=_("employer"),
        to="users.EmployerAccount",
        on_delete=models.CASCADE
    )
    location = models.CharField(
        verbose_name=_("location"),
        max_length=250,
    )
    application_deadline = models.DateTimeField(
        verbose_name=_("application deadline")
    )
    engagement = models.CharField(
        verbose_name=_("engagement"),
        max_length=20,
        choices=JobEngagements.choices,
    )
    category = models.CharField(
        verbose_name=_("category"),
        max_length=30,
        choices=JobCategories.choices,
        default=JobCategories.OTHER,
    )
    required_work_experience = models.CharField(
        verbose_name=_("required work experience"),
        max_length=20,
        choices=WorkExperienceLevels.choices,
        default=WorkExperienceLevels.NONE,
    )
    required_education = models.CharField(
        verbose_name=_("required education"),
        max_length=20,
        choices=EducationLevels.choices,
        default=EducationLevels.NONE,
    )
    additional_skills = models.TextField(
        verbose_name=_("additional skills"),
        blank=True
    )
    is_active = models.BooleanField(
        verbose_name=_("is active"),
        default=True
    )

    def __str__(self):
        return self.job_name
