from django.utils.translation import gettext_lazy as _
from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse
from django.utils.translation import get_language


def index_api_view(request: WSGIRequest) -> JsonResponse:
    data = {
        "message": _("Welcome to Opportunity Job web API"),
        "language": get_language()
    }
    return JsonResponse(data=data)
