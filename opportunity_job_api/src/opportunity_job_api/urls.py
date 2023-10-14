from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from apps.users.urls import urlpatterns as user_api_urlpatterns
from apps.jobs.urls import urlpatterns as job_api_urlpatterns
from opportunity_job_api.views import index_api_view

urlpatterns = i18n_patterns(
    path("admin/", admin.site.urls),
)

api_schema_urlpatterns = [
    path("", SpectacularAPIView.as_view(), name="schema"),
    path("swagger-ui/", SpectacularSwaggerView.as_view(url_name="api:schema"), name="swagger-ui"),
    path("redoc/", SpectacularRedocView.as_view(url_name="api:schema"), name="redoc"),
]

api_urlpatterns = [
    path("", index_api_view, name="index"),
    *user_api_urlpatterns,
    *job_api_urlpatterns,
    path("schema/", include(api_schema_urlpatterns)),
]

urlpatterns += [
    path("api/", include((api_urlpatterns, "opportunity_job"), namespace="api")),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
