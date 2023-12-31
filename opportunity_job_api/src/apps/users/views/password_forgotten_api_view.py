from django.http import JsonResponse
from rest_framework.views import APIView

from apps.users.serializers import PasswordForgottenSerializer
from apps.users.utils import send_password_reset_email


class PasswordForgottenAPIView(APIView):

    @staticmethod
    def post(request, **kwargs) -> JsonResponse:
        serializer = PasswordForgottenSerializer(data=request.data)
        if serializer.is_valid():
            send_password_reset_email(user=serializer.user)
        return JsonResponse(data={"message": "success"})
