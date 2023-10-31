from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import BaseModel


class JobEnrollment(BaseModel):
    class Meta:
        verbose_name = _("Job Enrollment")
        verbose_name_plural = _("Job Enrollments")
        unique_together = ("job_offer", "applicant_account")

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
    is_pending = models.BooleanField(
        verbose_name=_("pending?"),
        default=True,
        help_text=_(
            "The status indicates whether the enrollment "
            "has been processed. If the status is pending, "
            "the applicant either needs to connect with the "
            "employer to complete the application process, "
            "or someone else may need to apply for the job "
            "on behalf of the applicant."
        )
    )

    def __str__(self):
        return f'{self.applicant_account.user.email} >> {self.job_offer.job_name}'
