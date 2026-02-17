import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="container error-card">
            <span>404</span>
            <Header title="¡Vaya! Página no encontrada" subtitle="Parece que te has perdido en la protectora." />
            <button className="btn-primary" onClick={() => navigate("/about")}>Volver al Inicio</button>
        </div>
    );
}