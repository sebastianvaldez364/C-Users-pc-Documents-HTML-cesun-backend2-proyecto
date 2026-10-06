/**
 * Página de Clases de Habemus Classroom.
 *
 * Muestra las clases en las que el estudiante se encuentra inscrito.
 * Cada clase contiene información básica como profesor, horario,
 * modalidad y estado.
 *
 * Actualmente se utilizan datos locales de ejemplo.
 * Posteriormente esta información será obtenida desde el backend.
 */
function Clases() {

  /*
   * Lista temporal de clases.
   *
   * Cada objeto representa una clase registrada para el estudiante.
   * En una etapa posterior estos datos serán proporcionados
   * por la API de Habemus Classroom.
   */
  const clases = [
    {
      id: 1,
      nombre: "Desarrollo Web",
      profesor: "Carlos Ramírez",
      horario: "Lunes y Jueves · 09:00 - 10:30",
      modalidad: "Presencial",
      aula: "Laboratorio 2"
    },
    {
      id: 2,
      nombre: "Base de Datos",
      profesor: "Ana Martínez",
      horario: "Martes y Viernes · 11:00 - 12:30",
      modalidad: "Presencial",
      aula: "Aula 204"
    },
    {
      id: 3,
      nombre: "Redes",
      profesor: "Luis Hernández",
      horario: "Miércoles · 10:00 - 11:30",
      modalidad: "En línea",
      aula: "Clase virtual"
    }
  ]

  return (
    <main className="clases-page">

      {/* Encabezado principal de la página */}
      <section className="welcome">
        <h1>Mis clases</h1>

        <p>
          Consulta tus clases y accede al contenido de cada materia.
        </p>
      </section>

      {/* Contenedor de las tarjetas de clases */}
      <section className="clases-grid">

        {clases.map((clase) => (

          /*
           * Se genera una tarjeta por cada elemento
           * existente dentro del arreglo "clases".
           */
          <article
            className="clase-card"
            key={clase.id}
          >

            {/* Encabezado visual de la clase */}
            <div className="clase-card-header">

              <span>CLASE</span>

              <div className="clase-icon">
                📖
              </div>

            </div>

            {/* Información principal */}
            <div className="clase-card-content">

              <h2>{clase.nombre}</h2>

              <p className="clase-profesor">
                Profesor: {clase.profesor}
              </p>

              <div className="clase-details">

                <div>
                  <span className="detail-label">
                    Horario
                  </span>

                  <p>{clase.horario}</p>
                </div>

                <div>
                  <span className="detail-label">
                    Modalidad
                  </span>

                  <p>{clase.modalidad}</p>
                </div>

                <div>
                  <span className="detail-label">
                    Aula
                  </span>

                  <p>{clase.aula}</p>
                </div>

              </div>

              {/*
               * Por ahora el botón solamente forma parte
               * de la interfaz.
               *
               * Posteriormente permitirá abrir el contenido
               * correspondiente a cada clase.
               */}
              <button
                type="button"
                className="clase-button"
              >
                Ver clase →
              </button>

            </div>

          </article>

        ))}

      </section>

    </main>
  )
}

export default Clases