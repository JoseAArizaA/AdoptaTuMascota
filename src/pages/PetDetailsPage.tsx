import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petService } from "../services/petService";
import Header from "../components/Header";
import type { Pet } from "../types/Pet";


export default function PetDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                if (id) {
                    const datos = await petService.get(Number(id));
                    setPet(datos);
                }
            } catch (error) {
                console.error("Error al cargar detalle", error);
            } finally {
                setLoading(false); 
            }
        };
        cargarDetalle();
    }, [id]);

    if (!pet) return <div className="container"><p>Cargando detalles de la mascota...</p></div>;

    return (
        <div className="container">
            <Header title={pet.nombre} subtitle={`Detalles de ${pet.nombre}`} />
            
            <div className="card pet-details-layout">
                <div className="details-image-container">
                    <img src={pet.imagenUrl} alt={pet.nombre} className="img-full" />
                </div>
                
                <div className="details-info-container">
                    <h2 className="details-title">Conoce a {pet.nombre}</h2>
                    <p className="details-description">{pet.descripcion}</p>
                    
                    <div className="details-meta">
                        <p><strong>Especie:</strong> {pet.especie}</p>
                        <p><strong>Raza:</strong> {pet.raza}</p>
                        <p><strong>Edad:</strong> {pet.edad} años</p>
                        <p><strong>Estado:</strong> {pet.adoptado ? "Ya tiene un hogar" : "Buscando familia"}</p>
                    </div>
                    
                    <button className="btn-editar" onClick={() => navigate(`/pets/edit/${pet.id}`)}>
                        Editar Mascota
                     </button>
            
                    <button className="btn-back" onClick={() => navigate(pet.adoptado ? "/adopted" : "/pets")}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}