import { useAuth } from "../auth/authContext";
import Header from "../components/Header";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <div className="card">
            <Header title="Mi Perfil " />
            <div className="profile-details">
                <p><strong>Nombre:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>ID de Usuario:</strong> {user?.id}</p>
            </div>
            <div className="profile-actions">
                    <p className="profile-note">¿Quieres salir de tu cuenta?</p>
                    <button onClick={logout} className="btn-danger btn-block">
                        Cerrar Sesión
                    </button>
            </div>
        </div>
    );
}