from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import BaseModel


class EmployerAccount(BaseModel):
    class Meta:
        verbose_name = _("Employer Account")
        verbose_name_plural = _("Employer Accounts")

    type = "employer"

    user = models.OneToOneField(
        to=settings.AUTH_USER_MODEL,
        verbose_name=_("user"),
        on_delete=models.CASCADE,
    )
    company_name = models.CharField(
        verbose_name=_("company name"),
        max_length=250,
    )
    pib = models.CharField(
        verbose_name=_("PIB"),
        max_length=8,
    )
    address = models.CharField(
        verbose_name=_("company address"),
        max_length=250,
    )
    phone_number = models.CharField(
        verbose_name=_("company phone number"),
        max_length=30,
    )
    url = models.URLField(
        verbose_name=_("company url"),
    )
    about = models.TextField(
        verbose_name=_("about company"),
        max_length=500
    )
