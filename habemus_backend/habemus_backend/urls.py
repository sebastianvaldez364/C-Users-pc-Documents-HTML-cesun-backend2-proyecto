from django.contrib import admin
from django.urls import path, include


urlpatterns = [

    # Panel administrativo de Django.
    path(
        'admin/',
        admin.site.urls
    ),

    # API utilizada por el frontend React.
    path(
        'api/tareas/',
        include('tareas.urls')
    ),

]