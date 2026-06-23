from django.db import models
from django.contrib.auth.models import AbstractUser

class Clinica(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre

class Usuario(AbstractUser):
    # AbstractUser ya provee: id, username (usuario), password (encriptada), first_name (nombre)
    
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
