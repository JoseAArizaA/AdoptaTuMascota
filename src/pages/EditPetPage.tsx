import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petService } from "../services/petService";
import PetForm from "../components/PetForm";
import Header from "../components/Header";
import type { Pet } from "../types/Pet";

export default function EditPetPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);

    useEffect(() => {
        if (id) {
            petService.get(Number(id)).then(setPet);
        }
    }, [id]);

    if (!pet) return <div className="container"><p>Cargando datos...</p></div>;

    return (
        <div className="container">
            <Header title={`Editando a ${pet.nombre}`} subtitle="Cambia los datos necesarios" />
            <div className="form-wrapper">
                <PetForm 
                    key={pet.id}
                    pet={pet}
                    onSuccess={() => navigate(`/pets/${pet.id}`)}
                    onCancel={() => navigate(-1)} 
                />
            </div>
        </div>
    );
}