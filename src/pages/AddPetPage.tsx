import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PetForm from "../components/PetForm";

export default function AddPetPage() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/pets");
    };

    return (
        <div className="container page-add-pet">
            <Header 
                title="Registrar Mascota" 
                subtitle="Introduce los datos del nuevo integrante de la protectora." 
            />
            
            <div className="form-wrapper">
                <PetForm 
                    onSuccess={handleSuccess} 
                    onCancel={() => navigate("/pets")} 
                />
            </div>
        </div>
    );
}