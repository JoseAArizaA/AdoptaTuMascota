import { useEffect, useState } from "react";
import { petService } from "../services/petService";
import PetItem from "../components/PetItem";
import Header from "../components/Header";
import type { Pet } from "../types/Pet";
import toast from "react-hot-toast";

export default function AdoptedPetsPage() {
    const [adoptedPets, setAdoptedPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarAdoptados = async () => {
            try {
                const data = await petService.getAll(); 
                const filtradas = data.filter(p => p.adoptado === true);
                setAdoptedPets(filtradas);
            } catch (error) {
                console.error("Error al cargar mascotas:", error);
            } finally {
                setLoading(false); 
            }
        };
        cargarAdoptados();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota ya adoptada?")) {
            try {
                await petService.delete(id); 
                setAdoptedPets(adoptedPets.filter(p => p.id !== id));
                toast.success("Mascota eliminada correctamente");
            } catch {
                toast.error("No se pudo eliminar");
            }
        }
    }

    if (loading) return <div className="container"><p>Cargando...</p></div>;

    return (
        <div className="container">
            <Header title="¡Mascotas adoptadas!" subtitle="Ya han encontrado un hogar." />

            <div className="pets-grid">
                {adoptedPets.length > 0 ? (
                    adoptedPets.map(pet => (
                        <PetItem 
                            key={pet.id} 
                            pet={pet} 
                            onDelete={handleDelete} 
                            onAdopt={() => {}} 
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>Todavía no hay ninguna mascota adoptada.</p>
                    </div>    
                )}
            </div>
        </div>
    );
}