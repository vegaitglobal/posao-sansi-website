from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.users.models import AbstractAccount


class EmployerAccount(AbstractAccount):
    class Meta:
        verbose_name = _("Employer Account")
        verbose_name_plural = _("Employer Accounts")

    type = "employer"

    company_name = models.CharField(
        verbose_name=_("company name"),
        max_length=250,
    )
    pib = models.IntegerField(
        verbose_name=_("PIB"),
        help_text=_(
            "In Serbia, this number contains 9 numeric characters"
        )
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
