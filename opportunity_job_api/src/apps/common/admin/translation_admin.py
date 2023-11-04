from modeltranslation.admin import TranslationAdmin as BaseTranslationAdmin

from apps.common.admin import ModelAdmin


class TranslationAdmin(BaseTranslationAdmin, ModelAdmin):

    def get_fieldsets(self, request, obj=None) -> tuple:
        fieldsets = super().get_fieldsets(request=request, obj=obj)
        main_fields = fieldsets[0][1]["fields"]
        main_fields.insert(0, "id")
        fieldsets[0][1]["fields"] = main_fields
        return fieldsets

    def get_readonly_fields(self, request, obj=None) -> tuple:
        readonly_fields = super().get_readonly_fields(request=request, obj=obj)
        if "id" not in readonly_fields:
            readonly_fields += ("id",)
        return readonly_fields
