from django_filters import CharFilter
from django_filters.rest_framework import FilterSet

from apps.jobs.models import JobEnrollment


class JobEnrollmentFilterSet(FilterSet):
    applicant = CharFilter(field_name="applicant_account__user", lookup_expr="exact")

    class Meta:
        model = JobEnrollment
        fields = [
            "applicant",
        ]
