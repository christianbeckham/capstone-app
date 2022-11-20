from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CheckInImage

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_photo(request):
    if request.method == 'POST':
        images = request.FILES.getlist('image')
        user_full_name = f'{request.user.first_name}-{request.user.last_name}'

        for image in images:
            CheckInImage.objects.create(
                check_in_id=request.data['check_in_id'],
                title=user_full_name,
                image=image
            )

        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)
