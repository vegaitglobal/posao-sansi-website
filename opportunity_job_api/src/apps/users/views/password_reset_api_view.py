from http.client import BAD_REQUEST
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework.views import APIView
from apps.users.serializers import PasswordResetSerializer


class PasswordResetAPIView(APIView):

    @staticmethod
    def post(request, url_hash: str) -> JsonResponse:
        data = {**request.data, "url_hash": url_hash}
        serializer = PasswordResetSerializer(data=data)
        if serializer.is_valid():
            raw_password = serializer.validated_data.get("password")
            serializer.user.update(password=make_password(raw_password))
            return JsonResponse(data={"message": "success"})
        return JsonResponse(data={"errors": serializer.errors}, status=BAD_REQUEST)
