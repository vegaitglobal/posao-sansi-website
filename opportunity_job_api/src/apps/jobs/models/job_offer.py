from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import BaseModel
from apps.jobs.enums import JobCategory, JobEngagement
from apps.users.enums import Education, WorkExperience


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
        null=True,
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
        choices=JobEngagement.choices,
        default=JobEngagement.FULL_TIME,
    )
    category = models.CharField(
        verbose_name=_("category"),
        max_length=30,
        choices=JobCategory.choices,
        default=JobCategory.OTHER,
    )
    required_work_experience = models.CharField(
        verbose_name=_("required work experience"),
        max_length=20,
        choices=WorkExperience.choices,
        default=WorkExperience.NONE,
    )
    required_education = models.CharField(
        verbose_name=_("required education"),
        max_length=20,
        choices=Education.choices,
        default=Education.NONE,
    )
    additional_skills = models.CharField(
        verbose_name=_("additional skills"),
        max_length=250,
        blank=True
    )
    is_active = models.BooleanField(
        verbose_name=_("is active"),
        default=False
    )
