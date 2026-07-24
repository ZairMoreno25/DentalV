from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Cita, Clinica, Usuario

class UsuarioAdmin(UserAdmin):
    model = Usuario
    fieldsets = UserAdmin.fieldsets + (
        ('Información Adicional', {'fields': ('apellido_p', 'apellido_m', 'telefono', 'rol', 'clinica')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información Adicional', {
            'classes': ('wide',),
            'fields': ('apellido_p', 'apellido_m', 'telefono', 'rol', 'clinica'),
        }),
    )

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Clinica)


@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('nombre_paciente', 'fecha', 'hora', 'doctor', 'estado')
    list_filter = ('estado', 'fecha')
    search_fields = ('nombre_paciente', 'telefono', 'correo', 'doctor')
    ordering = ('fecha', 'hora')
