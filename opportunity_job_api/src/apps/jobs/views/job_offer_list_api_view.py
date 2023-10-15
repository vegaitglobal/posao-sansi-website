from django.db.models import QuerySet
from rest_framework.permissions import IsAuthenticated

from apps.common.views import ListCreateAPIView
from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer
from apps.users.models import ApplicantAccount, EmployerAccount


class JobOfferListCreateAPIView(ListCreateAPIView):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferSerializer
    model_class = JobOffer
    permission_classes = [IsAuthenticated]

    def filter_queryset(self, queryset: QuerySet) -> QuerySet:
        queryset = super().filter_queryset(queryset=queryset)
        account = self.request.user.get_account()
        if account.type == EmployerAccount.type:
            return queryset.filter(employer=account)
        elif account.type == ApplicantAccount.type:
            return queryset.filter(is_active=True)
        return queryset.none()
