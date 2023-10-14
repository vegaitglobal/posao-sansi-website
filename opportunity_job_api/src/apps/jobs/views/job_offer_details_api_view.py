from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from apps.jobs.serializers import JobOfferSerializer
from apps.jobs.models import JobOffer


class JobOfferDetailsAPIView(APIView):

    @staticmethod
    def get(request, id, **kwargs) -> JsonResponse:
        try:
            job_offer = JobOffer.objects.get(id = id)
            serializer = JobOfferSerializer(job_offer)
            return Response(serializer.data, status = status.HTTP_200_OK)
        except:
            return Response({"message": "Job offer with that ID doesn't exist."}, status = status.HTTP_404_NOT_FOUND)
        
    @staticmethod
    def patch(request, id, **kwargs) -> JsonResponse:
        try:
            job_offer = JobOffer.objects.get(id = id)
            new_job_offer = request.data
            serializer = JobOfferSerializer(instance = job_offer, data = new_job_offer, partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
        except:
            return Response({"message": "Job offer with that ID doesn't exist."}, status = status.HTTP_400_BAD_REQUEST)
        
    @staticmethod
    def delete(request, id, **kwargs):
        try:
            job_offer = JobOffer.objects.get(id = id)
            job_offer.delete()
            return Response({"message": "Successfully deleted"})
        except:
            return Response({"message": "Job offer with the given ID doesn't exist"}, status = status.HTTP_404_NOT_FOUND)



    # @staticmethod
    # def post(request, **kwargs) -> JsonResponse:
    #     serializer = ApplicantAccountSerializer(data=request.data, request=request)
    #     if serializer.is_valid():
    #         password = request.data.get("user").pop("password", "")
    #         create_applicant_user(serializer=serializer, password=password)
    #         return JsonResponse(data={"message": "success"})
    #     return JsonResponse(data={"errors": serializer.errors}, status=BAD_REQUEST)
