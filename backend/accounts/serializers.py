from rest_framework import serializers

from .models import Cita


class CitaSerializer(serializers.ModelSerializer):
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)

    class Meta:
        model = Cita
        fields = (
            'id',
            'nombre_paciente',
            'telefono',
            'correo',
            'genero',
            'edad',
            'fecha',
            'hora',
            'motivo',
            'doctor',
            'estado',
            'estado_display',
            'creado_en',
            'actualizado_en',
        )
        read_only_fields = ('id', 'creado_en', 'actualizado_en')

    def validate_edad(self, value):
        if value is not None and value > 120:
            raise serializers.ValidationError('La edad no puede ser mayor a 120 años.')
        return value
