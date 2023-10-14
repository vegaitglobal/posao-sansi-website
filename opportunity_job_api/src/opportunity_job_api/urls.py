from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from opportunity_job_api.views import index_api_view

urlpatterns = i18n_patterns(
    path("admin/", admin.site.urls),
)

api_urlpatterns = [
    path("", index_api_view, name="index"),
]

urlpatterns += [
    path("api/", include((api_urlpatterns, "opportunity_job"), namespace="api")),
    path('api/schema/', SpectacularAPIView.as_view(), name="schema"),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
