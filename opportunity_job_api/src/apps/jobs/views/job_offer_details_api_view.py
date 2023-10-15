from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer


class JobOfferDetailsAPIView(APIView):

    @staticmethod
    def get(request, pk: int, **kwargs):
        try:
            job_offer = JobOffer.objects.get(id=pk)
            serializer = JobOfferSerializer(job_offer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except JobOffer.DoesNotExist:
            return Response(
                data={"message": "Not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @staticmethod
    def patch(request, pk: int, **kwargs):
        try:
            job_offer = JobOffer.objects.get(id=pk)
            new_job_offer = request.data
            serializer = JobOfferSerializer(instance=job_offer, data=new_job_offer, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except JobOffer.DoesNotExist:
            return Response(
                data={"message": "Not found"},
                status=status.HTTP_400_BAD_REQUEST
            )

    @staticmethod
    def delete(request, pk: int, **kwargs):
        if job_offer := JobOffer.objects.filter(id=pk).filter():
            job_offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
