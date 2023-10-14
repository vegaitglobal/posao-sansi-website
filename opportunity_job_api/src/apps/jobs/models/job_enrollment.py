from django.db import models
from apps.common.models import BaseModel
from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.jobs.models import JobOffer
from apps.users.models.applicant_account import ApplicantAccount

class JobEnrollment(BaseModel):

    class Meta:
        verbose_name = _("Job Enrollment")
        verbose_name_plural = _("Job Enrollments")

    job_offer = models.ForeignKey(JobOffer, null=True, on_delete=models.CASCADE)
    applicant_account = models.ForeignKey(ApplicantAccount, null=True, on_delete=models.CASCADE)