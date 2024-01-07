import KotService from '../../service/Kot.service';
import { ReactieInput } from '../../types';
import database from '../../util/database'; // Importeer je database instance
import { Reactie } from '../model/Reactie';

// Create
const createReactie = async (reactieData) => {
    return await database.reactie.create({
        data: reactieData,
    });
};

// Read by ID
const getReactieById = async (id) => {
    return await database.reactie.findUnique({
        where: { id },
    });
};

// Read all
const getAllReacties = async () => {
    return await database.reactie.findMany();
};

const assignReactieToKot = async (reactieId: number, kotId: number) => {
    try {
        const existingReactie = await getReactieById(reactieId);
        if (!existingReactie) {
            throw new Error('Reaction not found');
        }
        const kot = await KotService.getKotById(kotId);
        if (!kot) {
            throw new Error('Kot not found');
        }
        await database.kot.update({
            where: { id: kotId },
            data: {
                reacties: {
                    connect: { id: reactieId },
                },
            },
        });
        return kot;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const removeReactieFromKot = async (reactieId: number, kotId: number) => {
    try {
        await database.kot.update({
            where: { id: kotId },
            data: {
                reacties: {
                    disconnect: { id: reactieId },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const removeReactie = async (reactieId: number): Promise<void> => {
    try {
        await database.reactie.delete({
            where: { id: reactieId },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateReactie = async (reactieId: number, updatedReactie: ReactieInput) => {
    try {
        const existingReactie = await getReactieById(reactieId);
        if (!existingReactie) {
            throw new Error('Reaction not found');
        }
        const updatedReaction = await database.reactie.update({
            where: { id: reactieId },
            data: updatedReactie,
        });
        return updatedReaction ? Reactie.from(updatedReaction) : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    createReactie,
    getReactieById,
    getAllReacties,
    assignReactieToKot,
    removeReactieFromKot,
    removeReactie,
    updateReactie,
};
