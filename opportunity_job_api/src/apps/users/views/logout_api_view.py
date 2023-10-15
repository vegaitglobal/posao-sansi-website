from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request, **kwargs) -> JsonResponse:
        Token.objects.get(key=request.headers.get('Authorization').split(" ")[1]).delete()
        return JsonResponse(data={'message': 'success'})
