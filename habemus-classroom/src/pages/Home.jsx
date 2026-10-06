import { Link } from 'react-router-dom'

function Home() {

  const cursos = [
    {
      id: 1,
      nombre: "Desarrollo Web",
      profesor: "Carlos Ramírez",
      progreso: 70
    },
    {
      id: 2,
      nombre: "Base de Datos",
      profesor: "Ana Martínez",
      progreso: 50
    },
    {
      id: 3,
      nombre: "Redes",
      profesor: "Luis Hernández",
      progreso: 85
    }
  ]

  return (
    <main className="home">

      <section className="welcome">
        <h1>Buenos días, Sebastián</h1>
        <p>Aquí tienes un resumen de tus actividades.</p>
      </section>


      <section className="summary">

        <div className="summary-card">
          <div className="card-icon">📚</div>

          <div>
            <span className="card-label">PRÓXIMA CLASE</span>

            <h2>Desarrollo Web</h2>

            <p>11:00 AM - 12:30 PM</p>

            {/* 
               Enlace hacia el calendario de tareas.
               React Router permite cambiar de página sin recargar
               completamente la aplicación.
            */}
           <Link
            to="/tareas"
             className="summary-link"
>
               Ver tareas →
</Link>
          </div>
        </div>


        <div className="summary-card">
          <div className="card-icon">📝</div>

          <div>
            <span className="card-label">TAREA PENDIENTE</span>

            <h2>Proyecto React</h2>

            <p>Entrega: 8 de octubre</p>

            <Link
            to="/tareas"
             className="summary-link"
>
               Ver tareas →
          </Link>
          </div>
        </div>

      </section>


      <section className="courses">

        <div className="section-header">
          <h2>Mis cursos</h2>

        <Link
            to="/cursos"
            className="see-all"
        >
            Ver todos →
        </Link>
        </div>


        <div className="courses-grid">

          {cursos.map((curso) => (

            <div className="course-card" key={curso.id}>

              <div className="course-header">
                <span>CURSO</span>
              </div>

              <div className="course-content">

                <h3>{curso.nombre}</h3>

                <p className="teacher">
                  {curso.profesor}
                </p>

                <div className="progress-info">
                  <span>Progreso</span>
                  <span>{curso.progreso}%</span>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress"
                    style={{
                      width: `${curso.progreso}%`
                    }}
                  ></div>

                </div>

                <button className="continue-button">
                  Continuar
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}

export default Home