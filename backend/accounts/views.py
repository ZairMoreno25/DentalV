from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

from .models import Cita
from .serializers import CitaSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({
            'success': True,
            'user': {
                'username': user.username,
                'rol': user.rol,
                'nombre': user.first_name,
                'apellido_p': user.apellido_p
            }
        })
    else:
        return Response({
            'success': False,
            'message': 'Credenciales incorrectas. Verifique su usuario y contraseña.'
        }, status=400)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def citas_view(request):
    if request.method == 'GET':
        citas = Cita.objects.all()
        fecha = request.query_params.get('fecha')
        if fecha:
            citas = citas.filter(fecha=fecha)
        return Response(CitaSerializer(citas, many=True).data)

    serializer = CitaSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([AllowAny])
def cita_detail_view(request, cita_id):
    try:
        cita = Cita.objects.get(pk=cita_id)
    except (Cita.DoesNotExist, ValueError):
        return Response(
            {'detail': 'Cita no encontrada.'},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == 'GET':
        return Response(CitaSerializer(cita).data)

    serializer = CitaSerializer(
        cita,
        data=request.data,
        partial=request.method == 'PATCH',
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
