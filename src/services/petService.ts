import type { Pet } from '../types/Pet';
import { http } from './http';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (API_BASE_URL == undefined) {
    throw new Error("No está definida la URL de la API");
}

const API_URL = API_BASE_URL +"/pets";

export const petService = {
    get(id: number): Promise<Pet> {
        return http.get<Pet>(`${API_URL}/${id}`).then(response => response.data);
    },
    getAll(): Promise<Pet[]> {
        return http.get<Pet[]>(API_URL).then(response => response.data);
    },
    delete(id :number) : Promise<void> {
        return http.delete<void>(`${API_URL}/${id}`).then(() => {});
    },
    create(petData: Omit<Pet, 'id'>): Promise<Pet> {
        return http.post<Pet>(API_URL, petData).then(response => response.data);
    },
    update(pet: Pet): Promise<Pet> {
        return http.patch<Pet>(`${API_URL}/${pet.id}`, pet).then(response => response.data);
    }
};