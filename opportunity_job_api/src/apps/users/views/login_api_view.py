from http.client import BAD_REQUEST

from django.http import JsonResponse
from rest_framework.views import APIView

from apps.users.serializers import LoginSerializer


class LoginAPIView(APIView):

    @staticmethod
    def post(request, **kwargs) -> JsonResponse:
        serializer = LoginSerializer(data=request.data, request=request)
        if serializer.is_valid():
            return JsonResponse(data=serializer.validated_data)
        return JsonResponse(data={"errors": serializer.errors}, status=BAD_REQUEST)
