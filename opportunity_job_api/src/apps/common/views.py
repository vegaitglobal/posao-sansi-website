from django.db.models import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.response import Response

from apps.common.models import BaseModel
from apps.common.paginator import Paginator


class ListCreateAPIView(generics.ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    model_class: type[BaseModel]

    def list(self, request, *args, **kwargs) -> Response:
        queryset = self.filter_queryset(queryset=self.model_class.objects.order_by("-created").all())
        paginator = Paginator(queryset=queryset, request=request)
        serializer_kwargs = self.get_serializer_kwargs(paginator=paginator)
        serializer = self.serializer_class(**serializer_kwargs)
        return Response(data=serializer.data)

    def filter_queryset(self, queryset) -> QuerySet:
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset

    def get_serializer_kwargs(self, **kwargs) -> dict:
        kwargs["request"] = self.request
        return kwargs
