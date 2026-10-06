from django.db import models


class Tarea(models.Model):
    """
    Representa una actividad asignada a un estudiante
    dentro de Habemus Classroom.

    Posteriormente el campo curso podrá convertirse
    en una relación con el modelo Curso.
    """

    titulo = models.CharField(max_length=200)

    curso = models.CharField(max_length=150)

    fecha_entrega = models.DateField()

    hora_entrega = models.TimeField()

    descripcion = models.TextField()

    instrucciones = models.TextField()

    color = models.CharField(
        max_length=20,
        default="azul"
    )

    def __str__(self):
        """
        Representación legible de la tarea dentro
        del administrador de Django.
        """
        return self.titulo