from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import BaseModel


class AbstractAccount(BaseModel):
    class Meta:
        abstract = True

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        verbose_name=_("user"),
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.verbose_name + " " + str(self.user)

    @property
    def is_active(self) -> bool:
        return self.user.is_active
