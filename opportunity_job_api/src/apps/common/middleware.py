from django.conf import settings
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse


class LanguageMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: WSGIRequest) -> HttpResponse:
        language = request.GET.get("language", settings.ENGLISH_LANG_SLUG)
        if language:
            from django.utils.translation import activate
            activate(language)
            request.META["LANGUAGE_CODE"] = language
        return self.get_response(request)
