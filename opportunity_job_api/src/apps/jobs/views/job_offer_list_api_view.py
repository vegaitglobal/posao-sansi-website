from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from apps.common.paginator import Paginator
from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer


class JobOfferListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_active', 'employer']

    def list(self, request, *args, **kwargs) -> Response:
        queryset = JobOffer.objects.order_by('-created').all()
        paginator = Paginator(queryset=queryset, request=request)
        serializer = JobOfferSerializer(
            paginator=paginator,
            request=request
        )
        return Response(data=serializer.data)
