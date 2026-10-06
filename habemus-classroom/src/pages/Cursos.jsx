import { useState } from 'react'

/**
 * Página de Cursos de Habemus Classroom.
 *
 * Esta página muestra todos los cursos en los que el estudiante
 * se encuentra inscrito.
 *
 * Los cursos se presentan en formato de lista para facilitar
 * su consulta cuando el estudiante tiene varias materias.
 *
 * Actualmente los datos son locales.
 * Posteriormente serán obtenidos desde el backend.
 */
function Cursos() {

  /*
   * Estado utilizado para almacenar el texto escrito
   * por el usuario en el buscador.
   */
  const [busqueda, setBusqueda] = useState('')

  /*
   * Estado utilizado para ordenar los cursos.
   *
   * Valores disponibles:
   * - nombre: orden alfabético.
   * - progreso: mayor porcentaje de progreso primero.
   */
  const [orden, setOrden] = useState('nombre')

  /*
   * Lista temporal de cursos.
   *
   * Posteriormente esta información será reemplazada
   * por datos provenientes de la API y la base de datos.
   */
  const cursos = [
    {
      id: 1,
      nombre: 'Desarrollo Web',
      profesor: 'Carlos Ramírez',
      descripcion: 'Desarrollo de aplicaciones y sitios web.',
      progreso: 70,
      codigo: 'DW-2026'
    },
    {
      id: 2,
      nombre: 'Base de Datos',
      profesor: 'Ana Martínez',
      descripcion: 'Diseño, administración y consulta de bases de datos.',
      progreso: 50,
      codigo: 'BD-2026'
    },
    {
      id: 3,
      nombre: 'Redes',
      profesor: 'Luis Hernández',
      descripcion: 'Fundamentos de redes y comunicación de datos.',
      progreso: 85,
      codigo: 'RED-2026'
    }
  ]

  /*
   * Primero se filtran los cursos utilizando el texto
   * introducido en el buscador.
   */
  const cursosFiltrados = cursos.filter((curso) =>
    curso.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  /*
   * Se crea una copia del arreglo filtrado para poder
   * ordenarlo sin modificar directamente los datos originales.
   */
  const cursosOrdenados = [...cursosFiltrados].sort((a, b) => {

    if (orden === 'progreso') {
      return b.progreso - a.progreso
    }

    return a.nombre.localeCompare(b.nombre)
  })

  return (
    <main className="cursos-page">

      {/* Encabezado principal */}
      <section className="cursos-title">

        <h1>Mis cursos</h1>

        <p>
          Consulta todos tus cursos y continúa con tu aprendizaje.
        </p>

      </section>


      {/* Herramientas para buscar y ordenar cursos */}
      <section className="cursos-tools">

        <div className="curso-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Buscar curso..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />

        </div>


        <select
          value={orden}
          onChange={(event) => setOrden(event.target.value)}
        >

          <option value="nombre">
            Ordenar por nombre
          </option>

          <option value="progreso">
            Ordenar por progreso
          </option>

        </select>

      </section>


      {/* Lista de cursos disponibles */}
      <section className="cursos-list">

        {cursosOrdenados.map((curso) => (

          <article
            className="curso-list-item"
            key={curso.id}
          >

            {/* Imagen o identificador visual del curso */}
            <div className="curso-list-image">

              <span>
                {curso.nombre.charAt(0)}
              </span>

            </div>


            {/* Información principal */}
            <div className="curso-list-info">

              <span className="curso-code">
                {curso.codigo}
              </span>

              <h2>
                {curso.nombre}
              </h2>

              <p className="curso-description">
                {curso.descripcion}
              </p>

              <p className="curso-teacher">
                Profesor: {curso.profesor}
              </p>


              {/* Progreso del estudiante */}
              <div className="curso-progress-container">

                <div className="curso-progress-text">

                  <span>Progreso</span>

                  <span>
                    {curso.progreso}%
                  </span>

                </div>


                <div className="curso-list-progress-bar">

                  <div
                    className="curso-list-progress"
                    style={{
                      width: `${curso.progreso}%`
                    }}
                  ></div>

                </div>

              </div>

            </div>


            {/* Acción correspondiente al curso */}
            <div className="curso-list-action">

              <button type="button">
                Entrar al curso
              </button>

            </div>

          </article>

        ))}


        {/*
         * Este mensaje solamente aparece cuando
         * el buscador no encuentra ningún curso.
         */}
        {cursosOrdenados.length === 0 && (

          <div className="no-courses">

            <h3>No se encontraron cursos</h3>

            <p>
              Intenta realizar una búsqueda diferente.
            </p>

          </div>

        )}

      </section>

    </main>
  )
}

export default Cursos