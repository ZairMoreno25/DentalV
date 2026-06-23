from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate

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
