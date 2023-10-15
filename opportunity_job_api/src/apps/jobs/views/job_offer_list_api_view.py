from django.db.models import QuerySet
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.response import Response

from apps.common.paginator import Paginator
from apps.jobs.filters import DonationFilterSet
from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer


class JobOfferListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = DonationFilterSet

    def list(self, request, *args, **kwargs) -> Response:
        queryset = self.filter_queryset(queryset=JobOffer.objects.order_by('-created').all())
        paginator = Paginator(queryset=queryset, request=request)
        serializer_kwargs = self.get_serializer_kwargs(paginator=paginator)
        serializer = self.serializer_class(**serializer_kwargs)
        return Response(data=serializer.data)

    def filter_queryset(self, queryset) -> QuerySet:
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset

    def get_serializer_kwargs(self, **kwargs) -> dict:
        kwargs['request'] = self.request
        return kwargs
