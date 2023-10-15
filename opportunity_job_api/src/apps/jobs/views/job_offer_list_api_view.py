from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.common.paginator import Paginator
from apps.jobs.models import JobOffer
from apps.jobs.serializers import JobOfferSerializer


class JobOfferListAPIView(APIView):

    @staticmethod
    def get(request, **kwargs):
        queryset = JobOffer.objects.order_by('-created').all()
        paginator = Paginator(queryset=queryset, request=request)
        serializer = JobOfferSerializer(
            paginator=paginator,
            request=request
        )
        return Response(data=serializer.data)

    @staticmethod
    def post(request, **kwargs):
        serializer = JobOfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
