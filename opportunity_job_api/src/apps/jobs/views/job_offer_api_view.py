from http.client import BAD_REQUEST

from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from apps.jobs.serializers import JobOfferSerializer
from apps.jobs.models import JobOffer


class JobOfferAPIView(APIView):

    @staticmethod
    def get(request, **kwargs) -> JsonResponse:
        job_offers = JobOffer.objects.all()
        serializer = JobOfferSerializer(list(job_offers), many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    @staticmethod
    def post(request, **kwargs) -> JsonResponse:
        serializer = JobOfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data = {"message": "success"})
        return JsonResponse(data={"errors": serializer.errors}, status=BAD_REQUEST)
