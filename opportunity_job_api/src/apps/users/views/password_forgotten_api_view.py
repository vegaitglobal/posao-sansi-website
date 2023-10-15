from http.client import BAD_REQUEST
from django.http import JsonResponse
from rest_framework.views import APIView
from apps.users.serializers import PasswordForgottenSerializer
from apps.users.utils import send_password_reset_email


class PasswordForgottenAPIView(APIView):

    @staticmethod
    def post(request, **kwargs) -> JsonResponse:
        serializer = PasswordForgottenSerializer(data=request.data, request=request)
        if serializer.is_valid():
            send_password_reset_email(email=serializer.user.email)
        return JsonResponse(data={'message': 'success'})
