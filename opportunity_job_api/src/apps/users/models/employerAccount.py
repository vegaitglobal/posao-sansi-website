from django.db import models


class EmployerAccount(models.BaseModel):
    class Meta:
        verbose_name = _("Employer Account")
        verbose_name_plural = _("Employer Accounts")

    user = models.ForeignKey(
        "User",
        verbose_name=_("user"),
        on_delete=models.CASCADE,
    )

    company_name = models.CharField(
        verbose_name=_("company name"),
        max_length=250,
    )