import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AppLayout() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <div className="app-layout">
            <header className="navbar">
                <div className="navbar-content">
                    <span className="logo">🐾 Huellas & Hogar</span>
                    
                    <nav className="nav-links">
                        <NavLink to="/about">Sobre Nosotros</NavLink>
                        
                        {/* Enlaces protegidos: Solo se ven si hay login */}
                        {isAuthenticated && (
                            <>
                                <NavLink to="/pets">Gestión de Mascotas</NavLink>
                                <NavLink to="/profile">Mi Perfil</NavLink>
                            </>
                        )}
                    </nav>

                    <div className="auth-section">
                        {isAuthenticated ? (
                            <div className="user-menu">
                                <span>Hola, <strong>{user?.name}</strong></span>
                                <button onClick={logout} className="btn-logout">Salir</button>
                            </div>
                        ) : (
                            <div className="guest-menu">
                                <NavLink to="/login">Entrar</NavLink>
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
                <p>&copy; 2026 Protectora de Animales - Proyecto React</p>
            </footer>
        </div>
    );
}