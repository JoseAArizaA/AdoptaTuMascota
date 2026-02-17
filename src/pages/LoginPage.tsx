import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { AuthService } from "../services/authService";
import Header from "../components/Header";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data = await AuthService.login(email, password);
            login(data);
            navigate("/pets"); 
        } catch (err) {
            setError("Error en el correo o la contraseña. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="card">
            <Header title="Iniciar Sesión 🐾" subtitle="Accede a tu cuenta" />

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        placeholder="tu@gmail.com"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                {error && <p className="error-msg">{error}</p>}

                <button type="submit" className="btn-primary">Entrar</button>
            </form>

            <div style={{ marginTop: '1rem' }}>
                <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
        </div>
    );
}