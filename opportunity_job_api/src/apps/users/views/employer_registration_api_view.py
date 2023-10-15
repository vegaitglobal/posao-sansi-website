from http.client import BAD_REQUEST

from django.http import JsonResponse
from rest_framework.views import APIView

from apps.users.serializers import EmployerAccountSerializer
from apps.users.utils import create_employer_user


class EmployerRegistrationAPIView(APIView):
    serializer_class = EmployerAccountSerializer

    @staticmethod
    def post(request, **kwargs) -> JsonResponse:
        serializer = EmployerAccountSerializer(data=request.data, request=request)
        if serializer.is_valid():
            password = request.data.get("user").pop("password", "")
            create_employer_user(serializer=serializer, password=password)
            return JsonResponse(data={"message": "success"})
        return JsonResponse(data={"errors": serializer.errors}, status=BAD_REQUEST)
