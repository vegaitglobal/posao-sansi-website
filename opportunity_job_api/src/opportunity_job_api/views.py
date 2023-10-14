from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse


def index_api_view(request: WSGIRequest) -> JsonResponse:
    return JsonResponse(data={"message": "Welcome to Opportunity Job web API"})
