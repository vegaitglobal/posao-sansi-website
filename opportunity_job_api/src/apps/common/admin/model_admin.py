from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.common.admin import TimestampableModelAdmin
from apps.common.models import BaseModel


class ModelAdmin(TimestampableModelAdmin):

    def get_fields(self, request, obj=None):
        fields = list(super().get_fields(request=request, obj=obj))
        if "id" in fields:
            fields.remove("id")
        fields.insert(0, "id")

        return tuple(fields)

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = super().get_readonly_fields(request=request, obj=obj)
        if "id" not in readonly_fields:
            readonly_fields += ("id",)
        return readonly_fields

    @admin.display(description=_("id"))
    def admin_id(self, obj: BaseModel = None) -> str:
        return f"{obj.verbose_name} {obj.pk}"
