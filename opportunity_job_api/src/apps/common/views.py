from django.db.models import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.response import Response

from apps.common.models import BaseModel
from apps.common.paginator import Paginator


class ListCreateAPIView(generics.ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    model_class: type[BaseModel]
    list_permission_classes = None
    create_permission_classes = None

    def get_permissions(self) -> tuple:
        permission_classes = tuple(self.permission_classes)
        permission_classes += self._get_method_specific_permission_classes()
        # Make sure there are no duplicates in the list:
        permission_classes = tuple(set(permission_classes))
        return tuple(permission() for permission in permission_classes)

    def _get_method_specific_permission_classes(self) -> tuple:
        if self.request.method == "GET" and self.list_permission_classes:
            return tuple(self.list_permission_classes)
        if self.request.method == "POST" and self.create_permission_classes:
            return tuple(self.create_permission_classes)
        return ()

    def list(self, request, *args, **kwargs) -> Response:
        filtered_queryset = self.filter_queryset(queryset=self.get_queryset())
        paginator = Paginator(queryset=filtered_queryset, request=request)
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
