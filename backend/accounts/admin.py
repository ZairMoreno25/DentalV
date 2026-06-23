from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Clinica, Usuario

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
