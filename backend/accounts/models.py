import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class Clinica(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre

class Usuario(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # AbstractUser ya provee: username (usuario), password (encriptada), first_name (nombre)
    
    ROLES = (
        ('doctor', 'Doctor'),
        ('secretaria', 'Secretaria'),
        ('administrador', 'Administrador'),
    )

    apellido_p = models.CharField(max_length=100, verbose_name="Apellido Paterno")
    apellido_m = models.CharField(max_length=100, verbose_name="Apellido Materno", blank=True, null=True)
    telefono = models.CharField(max_length=20)
    rol = models.CharField(max_length=20, choices=ROLES)
    clinica = models.ForeignKey(Clinica, on_delete=models.SET_NULL, null=True, blank=True, related_name="empleados")

    def __str__(self):
        return f"{self.username} - {self.get_rol_display()}"


class Cita(models.Model):
    ESTADOS = (
        ('en_espera', 'EN ESPERA'),
        ('confirmado', 'CONFIRMADO'),
        ('completado', 'COMPLETADO'),
        ('cancelado', 'CANCELADO'),
        ('no_asistio', 'NO ASISTIÓ'),
    )

    GENEROS = (
        ('m', 'Masculino'),
        ('f', 'Femenino'),
        ('o', 'Otro'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre_paciente = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(blank=True)
    genero = models.CharField(max_length=1, choices=GENEROS, blank=True)
    edad = models.PositiveSmallIntegerField(null=True, blank=True)
    fecha = models.DateField(db_index=True)
    hora = models.TimeField()
    motivo = models.TextField(blank=True)
    doctor = models.CharField(max_length=200, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='en_espera')
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('fecha', 'hora')
        constraints = [
            models.CheckConstraint(
                condition=models.Q(edad__isnull=True) | models.Q(edad__lte=120),
                name='cita_edad_valida',
            ),
        ]

    def __str__(self):
        return f"{self.nombre_paciente} - {self.fecha} {self.hora}"
