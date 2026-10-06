import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

/**
 * Componente Navbar.
 *
 * Proporciona navegación entre las diferentes
 * secciones de Habemus Classroom.
 *
 * También administra la visualización del menú
 * desplegable del perfil del estudiante.
 */
function Navbar() {

  // Controla si el menú del perfil está visible.
  const [menuAbierto, setMenuAbierto] = useState(false)

  /**
   * Alterna la visibilidad del menú de usuario.
   */
  const cambiarMenuPerfil = () => {
    setMenuAbierto(!menuAbierto)
  }

  return (
    <nav className="navbar">

      {/* Logotipo y acceso a la página principal */}
      <Link to="/" className="navbar-logo">
        Habemus
      </Link>

      {/* Opciones principales de navegación */}
      <div className="navbar-links">

        <NavLink to="/" end>
          Inicio
        </NavLink>

        <NavLink to="/horarios">
          Horarios
        </NavLink>

       <NavLink to="/clases">
         Clases
       </NavLink> 

        <NavLink to="/cursos">
        Cursos
        </NavLink>      

          <NavLink to="/tareas">
        Tareas
        </NavLink>
        <span className="navbar-pending">Apoyo</span>

      </div>

      {/* Menú del perfil del estudiante */}
      <div className="profile-container">

        <button
          type="button"
          className="profile-button"
          onClick={cambiarMenuPerfil}
          aria-label="Abrir menú de perfil"
          aria-expanded={menuAbierto}
        >
          👤
        </button>

        {/* Renderizado condicional del menú */}
        {menuAbierto && (

          <div className="profile-menu">

            {/* Información del usuario */}
            <div className="profile-info">

              <div className="profile-avatar">
                👤
              </div>

              <div>
                <h4>Sebastián Valdez</h4>
                <p>Estudiante</p>
              </div>

            </div>

            <div className="profile-divider"></div>

            {/* Opciones que implementaremos después */}
            <button className="profile-option">
              Mi perfil
            </button>

            <button className="profile-option">
              Configuración
            </button>

            <button className="profile-option">
              Accesibilidad
            </button>

            <div className="profile-divider"></div>

            <button className="profile-option logout">
              Cerrar sesión
            </button>

          </div>

        )}

      </div>

    </nav>
  )
}

export default Navbar