from rest_framework.fields import SerializerMethodField

from apps.common.serializers import ModelSerializer
from apps.jobs.models import JobEnrollment, JobOffer
from apps.users.models import ApplicantAccount


class JobOfferSerializer(ModelSerializer):
    class Meta:
        model = JobOffer
        fields = "__all__"

    has_enrolled = SerializerMethodField("_has_enrolled")

    def _has_enrolled(self, obj: JobOffer) -> bool:
        if account := self._get_authenticated_applicant_account():
            return JobEnrollment.objects.filter(
                applicant_account=account,
                job_offer=obj
            ).exists()
        return False

    def _get_authenticated_applicant_account(self) -> ApplicantAccount | None:
        if not (self.request.user.is_authenticated and self.request.user.is_active):
            return None

        account = self.request.user.get_account()
        if account and account.type == ApplicantAccount.type:
            return account
