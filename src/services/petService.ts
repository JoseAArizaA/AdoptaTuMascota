import type { Pet } from '../types/Pet';
import { http } from './http';

const API_URL = "/pets";

if (API_URL == undefined) {
    throw new Error("No está definida la URL de la API");
}

export const petService = {
    async get(id: number): Promise<Pet> {
        const response = await http.get<Pet>(`${API_URL}/${id}`);
        return response.data;
    },
    async getAll(): Promise<Pet[]> {
        const response = await http.get<Pet[]>(API_URL);
        return response.data;
    },
    async delete(id: number): Promise<void> {
        await http.delete(`${API_URL}/${id}`);
    },
    async create(petData: Omit<Pet, 'id'>): Promise<Pet> {
        const response = await http.post<Pet>(API_URL, petData);
        return response.data;
    },
    async update(pet: Pet): Promise<Pet> {
        const response = await http.patch<Pet>(`${API_URL}/${pet.id}`, pet);
        return response.data;
    },
    async adopt(id: number): Promise<Pet> {
        const response = await http.patch<Pet>(`${API_URL}/${id}/adopt`, {});
        return response.data;
    }
};