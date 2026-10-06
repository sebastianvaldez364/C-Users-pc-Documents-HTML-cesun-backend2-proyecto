import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Horarios from './pages/Horarios'
import Clases from './pages/Clases'
import Cursos from './pages/Cursos'
import Tareas from './pages/Tareas'

/**
 * Componente principal de Habemus Classroom.
 *
 * Define la estructura general de la aplicación y administra
 * las rutas principales mediante React Router.
 *
 * Las páginas se muestran debajo del Navbar sin necesidad
 * de recargar completamente el navegador.
 */
function App() {

  return (
    <BrowserRouter>

      {/* Barra de navegación visible en todas las páginas */}
      <Navbar />

      {/*
       * Sistema principal de rutas.
       *
       * Cada Route relaciona una URL con una página
       * específica de Habemus Classroom.
       */}
      <Routes>

        {/* Dashboard principal */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Horario semanal del estudiante */}
        <Route
          path="/horarios"
          element={<Horarios />}
        />

        {/* Clases en las que está inscrito el estudiante */}
        <Route
          path="/clases"
          element={<Clases />}
        />

        {/* Lista completa de cursos */}
        <Route
          path="/cursos"
          element={<Cursos />}
        />

        {/* Calendario y actividades del estudiante */}
        <Route
          path="/tareas"
          element={<Tareas />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App