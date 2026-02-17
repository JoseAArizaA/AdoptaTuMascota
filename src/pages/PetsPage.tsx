import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { petService } from "../services/petService";
import PetItem from "../components/PetItem";
import Header from "../components/Header";
import type { Pet } from "../types/Pet";
import toast from "react-hot-toast";

export default function PetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await petService.getAll(); 
                setPets(data);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
            try {
                await petService.delete(id);
                setPets(pets.filter(p => p.id !== id));
                toast.success("Mascota eliminada correctamente");
            } catch {
                toast.error("No se pudo eliminar");
            }
        }
    };

    const handleAdopt = async (id: number) => {
        try {
            await petService.adopt(id);
            setPets(pets.filter(p => p.id !== id));
            toast.success("¡Felicidades! Mascota adoptada");
        } catch {
            toast.error("Error al procesar la adopción");
        }
    };

    const disponibles = pets.filter(p => !p.adoptado);
    if (loading) return <div className="container"><p>Cargando mascotas...</p></div>;

    return (
        <div className="container">
            <Header title="Centro de Adopción" subtitle="Mascotas no adoptadas." />

            <div className="actions-bar">
                <button className="btn-primary" onClick={() => navigate("/pets/new")}>
                    + Nueva Mascota
                </button>
            </div>

           <div className="pets-grid">
                {disponibles.length > 0 ? (
                    disponibles.map(pet => (
                        <PetItem 
                            key={pet.id} 
                            pet={pet} 
                            onDelete={handleDelete}
                            onAdopt={handleAdopt}                       
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No hay mascotas disponibles para adoptar en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}