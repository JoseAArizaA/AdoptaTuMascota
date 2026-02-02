import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './routing/ProtectedRoute'
import PetsPage from './pages/PetsPage'
import LoginPage from './pages/LoginPage'
import AppLayout from './layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Ruta pública por defecto */}
        <Route path="/about" element={<AboutPage />} />
        
        {/* Rutas privadas */}
        <Route path="/pets" element={
          <ProtectedRoute>
            <PetsPage />
          </ProtectedRoute>
        } />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirección: si entras a la raíz, ve a about o pets */}
        <Route path="/" element={<Navigate to="/about" replace />} />
        
        {/* 404 */}
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Route>
    </Routes>
  )
}  

export default App
