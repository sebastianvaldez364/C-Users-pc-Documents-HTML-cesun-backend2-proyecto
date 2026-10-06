/**
 * Página de Horarios de Habemus Classroom.
 *
 * Permite visualizar las clases programadas
 * durante la semana.
 *
 * Actualmente utiliza información de ejemplo.
 * Posteriormente los horarios serán obtenidos
 * desde el backend y la base de datos.
 */
function Horarios() {

  // Arreglo con las clases programadas del estudiante.
  const horarios = [
    {
      id: 1,
      materia: "Desarrollo Web",
      profesor: "Carlos Ramírez",
      dia: "Lunes",
      inicio: "09:00",
      fin: "10:30"
    },
    {
      id: 2,
      materia: "Base de Datos",
      profesor: "Ana Martínez",
      dia: "Martes",
      inicio: "11:00",
      fin: "12:30"
    },
    {
      id: 3,
      materia: "Redes",
      profesor: "Luis Hernández",
      dia: "Miércoles",
      inicio: "10:00",
      fin: "11:30"
    },
    {
      id: 4,
      materia: "Desarrollo Web",
      profesor: "Carlos Ramírez",
      dia: "Jueves",
      inicio: "09:00",
      fin: "10:30"
    },
    {
      id: 5,
      materia: "Base de Datos",
      profesor: "Ana Martínez",
      dia: "Viernes",
      inicio: "12:00",
      fin: "13:30"
    }
  ]

  // Días que se mostrarán en el horario semanal.
  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes"
  ]

  return (
    <main className="horarios-page">

      {/* Encabezado de la página */}
      <section className="welcome">
        <h1>Mi horario de clases</h1>
        <p>Consulta tus clases y organiza tu semana.</p>
      </section>

      {/* Contenedor de los días de la semana */}
      <section className="horarios-grid">

        {dias.map((dia) => (

          <div className="horario-dia" key={dia}>

            {/* Nombre del día */}
            <h2>{dia}</h2>

            {/* Filtramos las clases correspondientes al día */}
            {horarios
              .filter((clase) => clase.dia === dia)
              .map((clase) => (

                <div
                  className="horario-clase"
                  key={clase.id}
                >

                  <h3>{clase.materia}</h3>

                  <p>{clase.profesor}</p>

                  <span>
                    {clase.inicio} - {clase.fin}
                  </span>

                </div>

              ))}

          </div>

        ))}

      </section>

    </main>
  )
}

export default Horarios