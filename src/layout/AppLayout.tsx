import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AppLayout() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="app-layout">
            <header className="navbar">
                <div className="navbar-content">
                    <div className="nav-left">
                        <Link to="/about" className="logo">
                            AdoptaTuMascota 🐕
                        </Link>
                    </div>
                    
                    <nav className="nav-links">
                        {/* Enlace publico */}
                        <NavLink to="/about">Sobre Nosotros</NavLink>
                        
                        {/* Enlaces protegidos */}
                        {isAuthenticated && (
                            <>
                                <NavLink to="/pets">Gestión de Mascotas</NavLink>
                                <NavLink to="/adopted">Mascotas Adoptadas</NavLink>
                            </>
                        )}
                    </nav>

                    <div className="auth-section">
                        {isAuthenticated ? (
                            <div className="user-menu">
                                <NavLink to="/profile">Mi Perfil</NavLink>
                                <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
                            </div>
                        ) : (
                            <div className="guest-menu">
                                <NavLink to="/login">Iniciar Sesión</NavLink>
                                <NavLink to="/register" className="btn-register">Registrarse</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="main-content">
                {/* El Outlet es donde se cargarán las páginas (About, Pets, etc.) */}
                <Outlet />
            </main>

            <footer className="footer">
                <p>&copy; 2026 Protectora de Animales AdoptaTuMascota - Jose Antonio Ariza Aguilera</p>
            </footer>
        </div>
    );
}