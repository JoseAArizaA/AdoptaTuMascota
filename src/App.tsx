import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './routing/ProtectedRoute'
import PetsPage from './pages/PetsPage'
import LoginPage from './pages/LoginPage'
import AppLayout from './layout/AppLayout'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import AddPetPage from './pages/AddPetPage'
import AdoptedPetsPage from './pages/AdoptedPetsPage'
import PetDetailsPage from './pages/PetDetailsPage'
import { Toaster } from 'react-hot-toast'
import EditPetPage from './pages/EditPetPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
  <><Toaster position="top-left" reverseOrder={false} />
    <Routes>
      
      
      <Route element={<AppLayout />}>
        {/* Ruta pública por defecto */}
        <Route path="/about" element={<AboutPage />} />
        
        {/* Rutas privadas */}
        {/* Ruta de listado de mascotas */}
        <Route path="/pets" element={
          <ProtectedRoute>
            <PetsPage />
          </ProtectedRoute>
        } />

        {/* Ruta de detalles de mascota */}
        <Route path="/pets/:id" element={
          <ProtectedRoute>
            <PetDetailsPage />
          </ProtectedRoute>
        } />
        
        {/* Ruta de edición de mascota */}
        <Route path="/pets/edit/:id" element={
          <ProtectedRoute>
            <EditPetPage />
          </ProtectedRoute>
        } />

        {/* Ruta de creación de mascota */}
        <Route path="/pets/new" element={
          <ProtectedRoute>
          <AddPetPage />
        </ProtectedRoute>
        } />

        {/* Ruta de perfil de usuario */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        {/* Ruta de mascotas adoptadas */}
        <Route path="/adopted" element={
          <ProtectedRoute>
            <AdoptedPetsPage />
          </ProtectedRoute>
        } />

        

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Redirección */}
        <Route path="/" element={<Navigate to="/about" replace />} />
        
        {/* Error */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
  )
}  

export default App
