from django.db import models
from apps.common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.jobs.enums import JobEngagement, JobCategory
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
    location = models.CharField(
        verbose_name=_("location"),
        max_length=250,
    )
    application_deadline = models.DateTimeField()
    engagement =  models.CharField(
        verbose_name=_("engagement"),
        max_length=20,
        choices=JobEngagement.choices,
        default=JobEngagement.FULL_TIME,
        help_text=_(
            "This field contains the type of Job Offer"
        ),
    )
    category =  models.CharField(
        verbose_name=_("category"),
        max_length=30,
        choices=JobCategory.choices,
        default=JobCategory.OTHER,
        help_text=_(
            "This field contains the category of Job Offer"
        ),
    )
    required_work_experience = models.CharField(
        verbose_name=_("required work experience"),
        max_length=20,
        choices=WorkExperience.choices,
        default=WorkExperience.NONE,
        help_text=_(
            "This field represents requiered work experience"
        ),
    )
    additional_skills = models.CharField(
        verbose_name=_("additional skills"),
        max_length=250,
    )
    is_active = models.BooleanField(
        verbose_name=_("is active"),
        default=False
    )
