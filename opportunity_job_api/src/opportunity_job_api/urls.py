from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from opportunity_job_api.views import index_api_view

urlpatterns = i18n_patterns(
    path("admin/", admin.site.urls),
)

api_urlpatterns = [
    path("", index_api_view, name="index"),
]

urlpatterns += [
    path("api/", include((api_urlpatterns, "opportunity_job"), namespace="api")),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
