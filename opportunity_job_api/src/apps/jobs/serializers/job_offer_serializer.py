from rest_framework.fields import SerializerMethodField

from apps.common.serializers import ModelSerializer
from apps.jobs.models import JobEnrollment, JobOffer
from apps.users.models import ApplicantAccount


class JobOfferSerializer(ModelSerializer):
    class Meta:
        model = JobOffer
        fields = "__all__"

    job_enrollment = SerializerMethodField("_get_job_enrollment")
    has_enrolled = SerializerMethodField("_has_enrolled")
    company_name = SerializerMethodField("_get_company_name")
    company_url = SerializerMethodField("_get_company_url")

    def _has_enrolled(self, obj: JobOffer) -> bool:
        if account := self._get_authenticated_applicant_account():
            return JobEnrollment.objects.filter(
                applicant_account=account,
                job_offer=obj
            ).exists()
        return False

    def _get_job_enrollment(self, obj: JobOffer) -> int | None:
        if account := self._get_authenticated_applicant_account():
            job_enrolment = JobEnrollment.objects.filter(
                applicant_account=account,
                job_offer=obj
            ).first()
            return job_enrolment.pk if job_enrolment else None
        return None

    def _get_authenticated_applicant_account(self) -> ApplicantAccount | None:
        if not (self.request and self.request.user.is_authenticated and self.request.user.is_active):
            return None

        account = self.request.user.get_account()
        if account and account.type == ApplicantAccount.type:
            return account

    def _get_company_name(self, obj: JobOffer) -> str:
        return obj.employer.company_name

    def _get_company_url(self, obj: JobOffer) -> str:
        return obj.employer.url
