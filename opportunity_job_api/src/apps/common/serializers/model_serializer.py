from rest_framework import serializers
from rest_framework.serializers import LIST_SERIALIZER_KWARGS

from apps.common.serializers import ListModelSerializer


class ModelSerializer(serializers.ModelSerializer):
    def __new__(cls, *args, **kwargs):
        if "paginator" in kwargs:
            return cls.init_list_serializer(*args, **kwargs)
        return super().__new__(cls, *args, **kwargs)

    @classmethod
    def init_list_serializer(cls, *args, **kwargs):
        allow_empty = kwargs.pop("allow_empty", None)
        max_length = kwargs.pop("max_length", None)
        min_length = kwargs.pop("min_length", None)
        paginator = kwargs.pop("paginator")
        kwargs["instance"] = paginator.page
        nested_serializer = cls(*args, **kwargs)
        list_kwargs = {
            "child": nested_serializer,
            "total_items": paginator.total_items,
            "total_pages": paginator.total_pages,
            "request": kwargs.get("request"),
        }
        if allow_empty is not None:
            list_kwargs["allow_empty"] = allow_empty
        if max_length is not None:
            list_kwargs["max_length"] = max_length
        if min_length is not None:
            list_kwargs["min_length"] = min_length
        list_kwargs.update({key: value for key, value in kwargs.items() if key in LIST_SERIALIZER_KWARGS})
        return ListModelSerializer(*args, **list_kwargs)

    def __init__(self, request=None, exclude_sensitive_fields: bool = True, **kwargs):
        super().__init__(**kwargs)
        self.request = request
        self.exclude_sensitive_fields = exclude_sensitive_fields
        for nested_serializer in self.nested_serializers:
            nested_serializer.exclude_sensitive_fields = self.exclude_sensitive_fields

    @property
    def nested_serializers(self) -> list["ModelSerializer"]:
        return [field for key, field in self.fields.items() if isinstance(field, ModelSerializer)]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if self.exclude_sensitive_fields:
            sensitive_fields = self.get_sensitive_fields()
            data = {key: value for key, value in data.items() if key not in sensitive_fields}

        return data

    def get_sensitive_fields(self) -> tuple:
        """ Returns names of the fields with sensitive data """
        return tuple()
