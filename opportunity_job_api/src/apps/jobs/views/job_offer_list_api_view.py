from apps.common.views import ListCreateAPIView
from apps.jobs.filtersets import JobOfferFilterSet
from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer


class JobOfferListCreateAPIView(ListCreateAPIView):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferSerializer
    filterset_class = JobOfferFilterSet
    model_class = JobOffer
