import { useState } from "react";
import { petService } from "../services/petService";
import type { Pet } from "../types/Pet";
import toast from "react-hot-toast";

interface Props {
    pet?: Pet;
    onSuccess: (newPet: Pet) => void;
    onCancel: () => void;
}

export default function PetForm({ pet, onSuccess, onCancel }: Props) {
    const [nombre, setNombre] = useState(pet?.nombre ||"");
    const [especie, setEspecie] = useState(pet?.especie || "");
    const [raza, setRaza] = useState(pet?.raza || "");
    const [edad, setEdad] = useState(pet?.edad || "");
    const [descripcion, setDescripcion] = useState(pet?.descripcion || "");
    const [imagen, setImagen] = useState(pet?.imagenUrl || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const Mascota = {
            ...pet,
            nombre,
            especie,
            raza,
            edad: Number(edad),
            descripcion,
            adoptado: pet?.adoptado ?? false,
            imagenUrl: imagen || "public/adoptatumascota.png"
        };

        const Accion = pet?.id 
        ? petService.update(Mascota as Pet) 
        : petService.create(Mascota as Pet);
        

        Accion.then(petCreada => {
                toast.success(`¡${nombre} se ha ${pet?.id ? 'actualizado' : 'registrado'}!`);
                onSuccess(petCreada);
            })
            .catch(() => toast.error("Vaya, hubo un problema al guardar la mascota"));
    };

    return (
        <div className="card form-container">
            <h3>Registrar nueva mascota 🐾</h3>
            <form onSubmit={handleSubmit} className="pet-form">
                <div className="form-group">
                    <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Especie" value={especie} onChange={e => setEspecie(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Raza" value={raza} onChange={e => setRaza(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Edad" value={edad} onChange={e => setEdad(e.target.value)} required />
                </div>
                <div className="form-group">
                    <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="URL Imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
                </div>
                
                <div className="btn-group">
                    <button type="submit" className="btn-primary">Guardar</button>
                    <button type="button" onClick={onCancel} className="btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
}