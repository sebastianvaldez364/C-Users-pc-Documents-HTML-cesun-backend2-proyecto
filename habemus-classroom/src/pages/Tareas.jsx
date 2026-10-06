import { useEffect, useState } from 'react'

/**
 * ==========================================================
 * PÁGINA DE TAREAS - HABEMUS CLASSROOM
 * ==========================================================
 *
 * Esta página muestra las actividades del estudiante
 * dentro de un calendario mensual.
 *
 * Las tareas ya NO están almacenadas directamente en React.
 * Ahora son obtenidas desde el backend desarrollado con Django.
 *
 * Flujo de información:
 *
 * SQLite
 *    ↓
 * Django
 *    ↓
 * Django REST Framework
 *    ↓
 * /api/tareas/
 *    ↓
 * React
 *    ↓
 * Calendario
 */

function Tareas() {

  /**
   * ==========================================================
   * ESTADOS PRINCIPALES
   * ==========================================================
   */

  /**
   * Guarda la tarea seleccionada por el usuario.
   *
   * Si es null, el panel lateral permanece cerrado.
   */
  const [tareaSeleccionada, setTareaSeleccionada] =
    useState(null)

  /**
   * Curso utilizado para filtrar las actividades.
   */
  const [cursoSeleccionado, setCursoSeleccionado] =
    useState('Todos')

  /**
   * Almacena las tareas obtenidas desde Django.
   */
  const [tareas, setTareas] = useState([])

  /**
   * Indica si React todavía está esperando
   * la respuesta del backend.
   */
  const [cargando, setCargando] = useState(true)

  /**
   * Guarda un mensaje si ocurre un error
   * durante la conexión con Django.
   */
  const [error, setError] = useState(null)


  /**
   * ==========================================================
   * DATOS DEL CALENDARIO
   * ==========================================================
   */

  const mes = 'Octubre'
  const anio = 2026

  /**
   * Octubre de 2026 comienza en jueves.
   *
   * Como nuestro calendario comienza en lunes,
   * necesitamos tres espacios antes del día 1.
   */
  const espaciosIniciales = 3

  /**
   * Octubre tiene 31 días.
   */
  const diasDelMes = 31

  /**
   * Generamos los números:
   *
   * 1, 2, 3 ... 31
   */
  const dias = Array.from(
    { length: diasDelMes },
    (_, index) => index + 1
  )


  /**
   * ==========================================================
   * CONEXIÓN CON DJANGO
   * ==========================================================
   *
   * useEffect se ejecuta cuando se carga esta página.
   *
   * React realiza una petición GET hacia:
   *
   * http://127.0.0.1:8000/api/tareas/
   *
   * Django responde con información en formato JSON.
   */

  useEffect(() => {

    const obtenerTareas = async () => {

      try {

        setCargando(true)

        /**
         * Realizamos la petición HTTP hacia
         * nuestra API desarrollada con Django.
         */
        const respuesta = await fetch(
          'http://127.0.0.1:8000/api/tareas/'
        )

        /**
         * Si Django devuelve un error,
         * detenemos el proceso.
         */
        if (!respuesta.ok) {
          throw new Error(
            'No fue posible obtener las tareas.'
          )
        }

        /**
         * Convertimos la respuesta JSON
         * en datos que JavaScript pueda utilizar.
         */
        const datos = await respuesta.json()


        /**
         * ======================================================
         * ADAPTACIÓN DE DATOS
         * ======================================================
         *
         * Django devuelve:
         *
         * fecha_entrega: "2026-10-08"
         * hora_entrega: "23:59:00"
         *
         * Nuestro calendario necesita también:
         *
         * dia: 8
         * hora: "23:59"
         *
         * Por eso transformamos cada tarea.
         */

        const tareasAdaptadas = datos.map((tarea) => {

          /**
           * Separamos:
           *
           * 2026-10-08
           *
           * en:
           *
           * ["2026", "10", "08"]
           */
          const partesFecha =
            tarea.fecha_entrega.split('-')

          /**
           * Obtenemos solamente el día.
           */
          const dia =
            Number(partesFecha[2])

          return {

            ...tarea,

            /**
             * Día utilizado para colocar la tarea
             * dentro del calendario.
             */
            dia: dia,

            /**
             * Conservamos la fecha completa.
             */
            fecha: tarea.fecha_entrega,

            /**
             * Django puede mandar:
             *
             * 23:59:00
             *
             * y mostramos:
             *
             * 23:59
             */
            hora: tarea.hora_entrega
              ? tarea.hora_entrega.substring(0, 5)
              : '',

            /**
             * Django guarda las instrucciones como texto.
             *
             * Cada salto de línea se convierte
             * en un elemento independiente.
             */
            instrucciones: tarea.instrucciones
              ? tarea.instrucciones
                  .split('\n')
                  .filter(
                    (instruccion) =>
                      instruccion.trim() !== ''
                  )
              : []

          }

        })


        /**
         * Guardamos las tareas obtenidas.
         *
         * Al actualizar este estado,
         * React vuelve a dibujar el calendario.
         */
        setTareas(tareasAdaptadas)

        setError(null)

      } catch (error) {

        console.error(
          'Error al conectar con Django:',
          error
        )

        setError(
          'No fue posible conectar con el servidor de Django.'
        )

      } finally {

        setCargando(false)

      }

    }

    obtenerTareas()

  }, [])


  /**
   * ==========================================================
   * CURSOS DISPONIBLES
   * ==========================================================
   *
   * Ya no escribimos manualmente:
   *
   * Desarrollo Web
   * Base de Datos
   * Redes
   *
   * Ahora React obtiene los nombres de las materias
   * directamente de las tareas recibidas desde Django.
   *
   * Set evita materias repetidas.
   */

  const cursos = [
    'Todos',
    ...new Set(
      tareas.map((tarea) => tarea.curso)
    )
  ]


  /**
   * ==========================================================
   * FILTRADO DE TAREAS
   * ==========================================================
   *
   * Si seleccionamos "Todos", aparecen todas.
   *
   * Si seleccionamos una materia,
   * solamente aparecen las tareas de esa materia.
   */

  const tareasFiltradas =
    cursoSeleccionado === 'Todos'
      ? tareas
      : tareas.filter(
          (tarea) =>
            tarea.curso === cursoSeleccionado
        )


  /**
   * ==========================================================
   * OBTENER TAREAS DE UN DÍA
   * ==========================================================
   *
   * Busca todas las actividades asignadas
   * a un día específico.
   */

  const obtenerTareasDelDia = (dia) => {

    return tareasFiltradas.filter(
      (tarea) => tarea.dia === dia
    )

  }


  /**
   * ==========================================================
   * ABRIR TAREA
   * ==========================================================
   *
   * Guarda la tarea seleccionada.
   *
   * Esto provoca que React muestre
   * el panel lateral con sus detalles.
   */

  const abrirTarea = (tarea) => {

    setTareaSeleccionada(tarea)

  }


  /**
   * ==========================================================
   * CERRAR TAREA
   * ==========================================================
   */

  const cerrarTarea = () => {

    setTareaSeleccionada(null)

  }


  /**
   * ==========================================================
   * FORMATEAR FECHA
   * ==========================================================
   *
   * Convierte:
   *
   * 2026-10-08
   *
   * en:
   *
   * 8 de octubre de 2026
   */

  const formatearFecha = (fecha) => {

    if (!fecha) {
      return ''
    }

    return new Date(
      `${fecha}T12:00:00`
    ).toLocaleDateString(
      'es-MX',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    )

  }


  /**
   * ==========================================================
   * INTERFAZ
   * ==========================================================
   */

  return (

    <main className="tareas-page">


      {/* =====================================
          ENCABEZADO DE LA PÁGINA
      ====================================== */}

      <section className="tareas-top">

        <div>

          <span className="tareas-label">
            ORGANIZACIÓN
          </span>

          <h1>
            Mis tareas
          </h1>

          <p>
            Consulta tus actividades y próximas fechas de entrega.
          </p>

        </div>


        {/* =====================================
            FILTRO DE MATERIAS
        ====================================== */}

        <div className="tareas-filter">

          <label htmlFor="curso">
            Mostrar
          </label>

          <select

            id="curso"

            value={cursoSeleccionado}

            onChange={(event) =>
              setCursoSeleccionado(
                event.target.value
              )
            }

          >

            {cursos.map((curso) => (

              <option
                key={curso}
                value={curso}
              >

                {curso === 'Todos'
                  ? 'Todos los cursos'
                  : curso}

              </option>

            ))}

          </select>

        </div>

      </section>


      {/* =====================================
          ESTADO DE LA CONEXIÓN CON DJANGO
      ====================================== */}

      {cargando && (

        <div className="backend-message">

          Cargando tareas desde Django...

        </div>

      )}


      {error && (

        <div className="backend-error">

          {error}

        </div>

      )}


      {/* =====================================
          TARJETA DEL CALENDARIO
      ====================================== */}

      <section className="habemus-calendar">


        {/* =====================================
            NAVEGACIÓN DEL CALENDARIO
        ====================================== */}

        <div className="calendar-navigation">

          <button

            type="button"

            className="month-button"

            aria-label="Mes anterior"

          >

            ‹

          </button>


          <div className="calendar-current-month">

            <span>
              CALENDARIO
            </span>

            <h2>
              {mes} {anio}
            </h2>

          </div>


          <button

            type="button"

            className="month-button"

            aria-label="Mes siguiente"

          >

            ›

          </button>

        </div>


        {/* =====================================
            NOMBRES DE LOS DÍAS
        ====================================== */}

        <div className="calendar-week">

          <div>LUN</div>

          <div>MAR</div>

          <div>MIÉ</div>

          <div>JUE</div>

          <div>VIE</div>

          <div>SÁB</div>

          <div>DOM</div>

        </div>


        {/* =====================================
            CASILLAS DEL CALENDARIO
        ====================================== */}

        <div className="calendar-boxes">


          {/* Espacios anteriores al 1 de octubre */}

          {Array.from({

            length: espaciosIniciales

          }).map((_, index) => (

            <div

              className="
                calendar-box
                calendar-box-empty
              "

              key={`empty-${index}`}

            />

          ))}


          {/* =====================================
              GENERACIÓN DE LOS DÍAS
          ====================================== */}

          {dias.map((dia) => {

            const tareasDelDia =
              obtenerTareasDelDia(dia)

            return (

              <div

                className={`calendar-box ${
                  tareasDelDia.length > 0
                    ? 'calendar-box-with-task'
                    : ''
                }`}

                key={dia}

              >


                {/* Número del día */}

                <div className="calendar-box-header">

                  <span className="calendar-number">

                    {dia}

                  </span>


                  {/* Cantidad de tareas */}

                  {tareasDelDia.length > 0 && (

                    <span className="task-count">

                      {tareasDelDia.length}

                    </span>

                  )}

                </div>


                {/* =====================================
                    TAREAS DEL DÍA
                ====================================== */}

                <div className="calendar-box-tasks">

                  {tareasDelDia.map((tarea) => (

                    <button

                      type="button"

                      className={
                        `calendar-event event-${tarea.color}`
                      }

                      key={tarea.id}

                      onClick={() =>
                        abrirTarea(tarea)
                      }

                    >

                      <span className="event-course">

                        {tarea.curso}

                      </span>


                      <span className="event-title">

                        {tarea.titulo}

                      </span>


                      <span className="event-time">

                        {tarea.hora}

                      </span>

                    </button>

                  ))}

                </div>

              </div>

            )

          })}

        </div>

      </section>


      {/* =====================================
          LEYENDA DE MATERIAS
      ====================================== */}

      <section className="calendar-legend">

        <div>

          <span className="legend-dot legend-blue">
          </span>

          Desarrollo Web

        </div>


        <div>

          <span className="legend-dot legend-purple">
          </span>

          Base de Datos

        </div>


        <div>

          <span className="legend-dot legend-green">
          </span>

          Redes

        </div>

      </section>


      {/* =====================================
          FONDO DEL PANEL
      ====================================== */}

      {tareaSeleccionada && (

        <div

          className="task-overlay"

          onClick={cerrarTarea}

        />

      )}


      {/* =====================================
          PANEL DE DETALLES DE LA TAREA
      ====================================== */}

      {tareaSeleccionada && (

        <aside className="task-panel">


          {/* =====================================
              MATERIA
          ====================================== */}

          <div className="task-course">

            <span>
              MATERIA
            </span>

            <h3>
              {tareaSeleccionada.curso}
            </h3>

          </div>


          {/* =====================================
              ENCABEZADO DE LA ACTIVIDAD
          ====================================== */}

          <div className="task-panel-header">

            <div>

              <span className="task-type">

                ACTIVIDAD

              </span>

              <h2>

                {tareaSeleccionada.titulo}

              </h2>

            </div>


            <button

              type="button"

              className="close-task"

              onClick={cerrarTarea}

              aria-label="Cerrar tarea"

            >

              ×

            </button>

          </div>


          {/* =====================================
              INFORMACIÓN DE LA TAREA
          ====================================== */}

          <div className="task-panel-content">


            {/* Fecha */}

            <div className="task-date-card">

              <div className="task-date-icon">

                ◷

              </div>


              <div>

                <span>

                  FECHA DE ENTREGA

                </span>

                <strong>

                  {formatearFecha(
                    tareaSeleccionada.fecha
                  )}

                </strong>

                <p>

                  {tareaSeleccionada.hora}

                </p>

              </div>

            </div>


            {/* =====================================
                DESCRIPCIÓN
            ====================================== */}

            <div className="task-information">

              <h3>
                Descripción
              </h3>

              <p>

                {tareaSeleccionada.descripcion}

              </p>

            </div>


            {/* =====================================
                INSTRUCCIONES
            ====================================== */}

            <div className="task-information">

              <h3>
                Instrucciones
              </h3>

              <ul>

                {tareaSeleccionada.instrucciones.map(

                  (instruccion, index) => (

                    <li key={index}>

                      {instruccion}

                    </li>

                  )

                )}

              </ul>

            </div>

          </div>


          {/* =====================================
              PIE DEL PANEL
          ====================================== */}

          <div className="task-panel-footer">

            <button type="button">

              Ir a la actividad →

            </button>

          </div>

        </aside>

      )}

    </main>

  )

}

export default Tareas