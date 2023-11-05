from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.jobs.models import JobOffer
from apps.jobs.serializers import ReadJobOfferSerializer, WriteJobOfferSerializer
from apps.users.models import ApplicantAccount
from apps.users.permissions import HasAccount


class JobOfferDetailsAPIView(APIView):
    serializer_class = ReadJobOfferSerializer
    permission_classes = [HasAccount]

    def get(self, request, pk: int, **kwargs) -> Response:
        if job_offer := self._get_job_offer(pk=pk):
            with_raw_values = self.request.query_params.get("raw_values") == "true"
            serializer_class = WriteJobOfferSerializer if with_raw_values else ReadJobOfferSerializer
            serializer = serializer_class(instance=job_offer, request=request)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(data={"message": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk: int, **kwargs) -> Response:
        job_offer = self._get_job_offer(pk=pk)
        if not job_offer:
            return Response(
                data={"message": "Not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ReadJobOfferSerializer(
            instance=job_offer,
            data=request.data,
            partial=True,
            request=request
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk: int, **kwargs):
        if job_offer := self._get_job_offer(pk=pk):
            job_offer.delete()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)

    def _get_job_offer(self, pk: int) -> JobOffer | None:
        try:
            job_offer = JobOffer.objects.get(id=pk)
        except JobOffer.DoesNotExist:
            return None
        if self._has_access_to_job_offer(job_offer=job_offer):
            return job_offer

    def _has_access_to_job_offer(self, job_offer: JobOffer) -> bool:
        account = self.request.user.get_account()
        return (
            account.type == ApplicantAccount.type
            and job_offer.is_active
            or job_offer.employer == account
        )
