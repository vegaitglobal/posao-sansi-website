from django.db import models
from apps.common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class JobEnrollment(BaseModel):

    class Meta:
        verbose_name = _("Job Enrollment")
        verbose_name_plural = _("Job Enrollments")

    job_offer = models.ForeignKey(
        verbose_name=_("job offer"),
        to="jobs.JobOffer",
        null=True,
        on_delete=models.CASCADE
    )
    applicant_account = models.ForeignKey(
        verbose_name=_("applicant account"),
        to="users.ApplicantAccount",
        null=True,
        on_delete=models.CASCADE
    )