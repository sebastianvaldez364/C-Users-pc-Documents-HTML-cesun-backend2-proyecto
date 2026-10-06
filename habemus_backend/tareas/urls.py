from django.urls import path
from .views import ListaTareasView


urlpatterns = [

    # GET /api/tareas/
    # Devuelve todas las tareas registradas.
    path(
        '',
        ListaTareasView.as_view(),
        name='lista-tareas'
    ),

]