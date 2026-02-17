import { Link } from "react-router-dom";
import type { Pet } from "../types/Pet";


interface Props {
    pet: Pet;
    onDelete: (id: number) => void;
    onAdopt: (id: number) => void;
}

export default function PetItem({ pet, onDelete, onAdopt }: Props) {
    return (
        <div className="card pet-item">
            <Link to={`/pets/${pet.id}`} className="pet-details-link">
                <img src={pet.imagenUrl} alt={pet.nombre} className="pet-img-header" />
                <div className="pet-card-content">
                    <h3>{pet.nombre} {pet.adoptado && <small>(Adoptado)</small>}</h3>
                </div>
            </Link>
                
            <div className="btn-group">
                {!pet.adoptado && (
                    <button 
                        className="btn-primary" 
                        onClick={() => onAdopt(pet.id)}>
                        Adoptar
                    </button>
                )}
                <button 
                    className="btn-danger" 
                    onClick={() => onDelete(pet.id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}