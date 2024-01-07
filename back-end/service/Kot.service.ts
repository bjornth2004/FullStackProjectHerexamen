import { UnauthorizedError } from 'express-jwt';
import KotDb from '../domain/data-access/Kot.db';
import { KotInput, Role } from '../types';
import { Kot } from '../domain/model/Kot';

const createKot = async (kotInput: KotInput) => {
    // Geen noodzaak om een nieuw Kot object te maken, Prisma zal dit voor je doen
    return await KotDb.createKot(kotInput);
};

const getKoten = async ({ email, role }: { email: string; role: string }): Promise<Kot[]> => {
    if (role === 'admin') {
        return await KotDb.getAllKoten();
    } else if (role === 'verhuurder') {
        return await KotDb.getKotenForVerhuurder(email);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this recourse.',
        });
    }
};

const getKotById = async (id: number) => {
    return await KotDb.getKotById(id);
};

// Functie om een huurder aan een kot toe te wijzen
const assignHuurderToKot = async (kotId: number, huurderId: number) => {
    return await KotDb.assignHuurderToKot(kotId, huurderId);
};

// Functie om een verhuurder aan een kot toe te wijzen
const assignVerhuurderToKot = async (kotId: number, verhuurderId: number) => {
    return await KotDb.assignVerhuurderToKot(kotId, verhuurderId);
};

const deleteKot = async (id: number): Promise<void> => {
    return await KotDb.deleteKot(id);
};

const updateKot = async (kotId: number, kotInput: KotInput) => {
    return await KotDb.updateKot(kotId, kotInput);
};

export default {
    createKot,
    getKoten,
    getKotById,
    assignHuurderToKot,
    assignVerhuurderToKot,
    deleteKot,
    updateKot,
};
