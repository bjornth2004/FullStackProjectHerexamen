import { VerhuurderInput } from '../../types';
import database from '../../util/database'; // Importeer je database instance

// Create
const createVerhuurder = async (verhuurderData) => {
    try {
        const verhuurder = await database.verhuurder.create({
            data: verhuurderData,
        });
        return verhuurder;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

//Read by Email
const getVerhuurderByEmail = async (email) => {
    return await database.verhuurder.findUnique({
        where: { email },
    });
};

// Read by ID
const getVerhuurderById = async (id) => {
    return await database.verhuurder.findUnique({
        where: { id },
    });
};

// Read all
const getAllVerhuurders = async () => {
    return await database.verhuurder.findMany();
};

// Update
const updateVerhuurder = async (id: number, verhuurderData) => {
    try {
        const existingVerhuurder = await database.verhuurder.findUnique({
            where: { id },
        });
        if (!existingVerhuurder) {
            throw new Error('Verhuurder not found');
        }
        const updatedVerhuurder = await database.verhuurder.update({
            where: { id },
            data: verhuurderData,
        });
        return updatedVerhuurder;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete
const deleteVerhuurder = async (verhuurderId: number): Promise<void> => {
    try {
        await database.verhuurder.delete({
            where: { id: verhuurderId },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Could not delete verhuurder'); // Specifieke foutmelding
    }
};

export default {
    createVerhuurder,
    getVerhuurderById,
    getAllVerhuurders,
    updateVerhuurder,
    deleteVerhuurder,
    getVerhuurderByEmail,
};
