import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/authService";
import { useAuth } from "../auth/authContext";
import Header from "../components/Header";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        AuthService.register(email, password, name)
            .then(data => {
                login(data);
                navigate("/pets");
            })
    };

    return (
        <div className="card">
            <Header title="Registrate 🐾" subtitle="Rellena los campos para registrarte" />
            
            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}

                <button type="submit" className="btn-primary">Registrarse</button>
            </form>
            <p style={{marginTop: '1rem'}}>¿Ya tienes cuenta? <Link to="/login">Entra aquí</Link></p>
        </div>
    );
}