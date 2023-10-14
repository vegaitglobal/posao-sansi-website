from django.db import models
from apps.common.models import BaseModel
from django.db import models
# Create your models here.

class FAQ(BaseModel):

    class Meta:
        verbose_name = _("FAQ")
        verbose_name_plural = _("Frequently Asked Questions")

    question = models.CharField(
        verbose_name=_("question"),
        max_length=250,
    )
    answer = models.CharField(
        verbose_name=_("answer"),
        max_length=250,
    )
    display_to_anonymous = models.BooleanField(
        verbose_name=_("display to anonymous"),
        default=False
    )
    display_to_employers = models.BooleanField(
        verbose_name=_("display to employers"),
        default=False
    )
    display_to_applicants = models.BooleanField(
        verbose_name=_("display to applicants"),
        default=False
    )