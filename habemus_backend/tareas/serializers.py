from rest_framework import serializers
from .models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    """
    Convierte los objetos Tarea de Django a JSON
    para que puedan ser utilizados por React.
    """

    class Meta:
        model = Tarea

        fields = [
            'id',
            'titulo',
            'curso',
            'fecha_entrega',
            'hora_entrega',
            'descripcion',
            'instrucciones',
            'color',
        ]