from django.contrib import admin
from .models import Tarea


# Permite administrar las tareas desde
# el panel administrativo de Django.
admin.site.register(Tarea)