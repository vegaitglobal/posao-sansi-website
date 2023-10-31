from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import Group
from django.db.models import QuerySet
from django.db.models.functions import Collate
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from apps.common.admin import ModelAdmin
from apps.common.utils import get_model_admin_change_details_url
from apps.users.models import User

admin.site.unregister(Group)


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = (User.USERNAME_FIELD,)


@admin.register(User)
class UserAdmin(ModelAdmin, BaseUserAdmin):
    list_display = (
        "email",
        "account",
        "is_active",
        "is_staff",
        "is_superuser",
    )
    search_fields = (
        "email_deterministic",
    )
    ordering = (
        "email",
    )
    add_form = CreateUserForm
    fieldsets = (
        (None, {
            "fields": (
                "id",
                "account",
                "email",
                "password"
            )
        }),
        (_("Permissions"), {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
            ),
        },),
        (_("Important dates"), {
            "fields": (
                "last_login",
                "date_joined",
                "created",
                "modified",
            )
        },),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2"),
        },),
    )
    readonly_fields = (
        "last_login",
        "date_joined",
        "account",
    )

    def get_queryset(self, request) -> QuerySet:
        queryset = super().get_queryset(request)
        return queryset.annotate(email_deterministic=Collate("email", "und-x-icu"))

    @admin.display(description=_("account"))
    def account(self, obj: User = None) -> str:
        if obj and (account := obj.get_account()):
            href = get_model_admin_change_details_url(obj=account)
            return mark_safe(f'<a href="{href}">{account.verbose_name}</a>')
        return "-"
