from rest_framework import status
from rest_framework.test import APITestCase

from .models import Cita


class CitasApiTests(APITestCase):
    payload = {
        'nombre_paciente': 'Paciente Prueba',
        'telefono': '6641234567',
        'correo': 'paciente@example.com',
        'genero': 'o',
        'edad': 30,
        'fecha': '2026-07-24',
        'hora': '09:30:00',
        'motivo': 'Limpieza',
        'doctor': 'Dra. Prueba',
        'estado': 'en_espera',
    }

    def test_crear_y_listar_cita(self):
        create_response = self.client.post('/api/citas/', self.payload, format='json')

        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cita.objects.count(), 1)

        list_response = self.client.get('/api/citas/')
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(list_response.data[0]['nombre_paciente'], 'Paciente Prueba')

    def test_actualizar_estado_de_cita(self):
        cita = Cita.objects.create(**self.payload)

        response = self.client.patch(
            f'/api/citas/{cita.id}/',
            {'estado': 'cancelado'},
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        cita.refresh_from_db()
        self.assertEqual(cita.estado, 'cancelado')

# Create your tests here.
