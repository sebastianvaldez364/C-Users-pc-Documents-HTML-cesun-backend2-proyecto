from rest_framework.generics import ListAPIView

from .models import Tarea
from .serializers import TareaSerializer


class ListaTareasView(ListAPIView):
    """
    Endpoint encargado de devolver todas las tareas
    registradas en Habemus Classroom.

    React realizará una petición GET a esta vista.
    """

    queryset = Tarea.objects.all().order_by('fecha_entrega')

    serializer_class = TareaSerializer

# Create your views here.
