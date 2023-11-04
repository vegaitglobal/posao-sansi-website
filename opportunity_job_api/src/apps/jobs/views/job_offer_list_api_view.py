from django.db.models import QuerySet
from rest_framework.permissions import IsAuthenticated

from apps.common.views import ListCreateAPIView
from apps.jobs.models import JobOffer
from apps.jobs.serializers import ReadJobOfferSerializer, WriteJobOfferSerializer
from apps.users.models import ApplicantAccount, EmployerAccount
from apps.users.permissions import IsEmployer


class JobOfferListCreateAPIView(ListCreateAPIView):
    queryset = JobOffer.objects.all()
    serializer_class = ReadJobOfferSerializer
    model_class = JobOffer
    permission_classes = [IsAuthenticated]
    create_permission_classes = [IsEmployer]

    def get_serializer_class(self) -> type[ReadJobOfferSerializer | WriteJobOfferSerializer]:
        if self.request.method == "POST":
            return WriteJobOfferSerializer
        return ReadJobOfferSerializer

    def filter_queryset(self, queryset: QuerySet) -> QuerySet:
        queryset = super().filter_queryset(queryset=queryset)
        account = self.request.user.get_account()
        if account.type == EmployerAccount.type:
            return queryset.filter(employer=account)
        if account.type == ApplicantAccount.type:
            return queryset.filter(is_active=True)
        return queryset.none()

    def get_serializer(self, *args, **kwargs) -> ReadJobOfferSerializer:
        if self.request.method == "POST":
            account = self.request.user.get_account()
            kwargs["data"]["employer"] = account.pk
        return super().get_serializer(*args, **kwargs)
