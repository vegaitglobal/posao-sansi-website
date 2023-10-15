from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django_filters import CharFilter, BooleanFilter

from apps.jobs.models import JobOffer


class DonationFilterSet(FilterSet):
    employer = CharFilter(field_name="employer__user", lookup_expr="exact")

    class Meta:
        model = JobOffer
        fields = [
            "employer",
            "is_active",
        ]
