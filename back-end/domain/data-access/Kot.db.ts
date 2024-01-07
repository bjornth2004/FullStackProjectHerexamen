import { Kot } from '../model/Kot';
import database from '../../util/database';
import { KotInput } from '../../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllKoten = async (): Promise<Kot[]> => {
    try {
        const kotenPrisma = await database.kot.findMany({
            include: {
                verhuurder: true,
                reacties: true, //deze toegevoegd
            },
        });
        return kotenPrisma.map((kotPrisma) => Kot.from(kotPrisma));
    } catch (error) {
        console.log(error);
    }
};

const getKotById = async (id: number): Promise<Kot | null> => {
    try {
        const kotPrisma = await database.kot.findUnique({
            where: { id },
            include: {
                verhuurder: true,
                reacties: true,
            },
        });
        return kotPrisma ? Kot.from(kotPrisma) : null;
    } catch (error) {
        console.log(error);
    }
};

const getKotenForVerhuurder = async (verhuurderEmail: string): Promise<Kot[]> => {
    try {
        const kotenPrisma = await prisma.kot.findMany({
            where: {
                verhuurder: {
                    email: verhuurderEmail,
                },
            },
            include: {
                verhuurder: true,
                reacties: true,
            },
        });

        return kotenPrisma.map((kot) => Kot.from(kot));
    } catch (error) {
        console.error('Error retrieving koten for verhuurder:', error);
        throw error;
    }
};

const createKot = async (kotData: KotInput): Promise<Kot> => {
    try {
        const newKot = await database.kot.create({
            data: {
                actief: kotData.actief,
                oppervlakte: kotData.oppervlakte,
                locatie: kotData.locatie,
                verhuurprijs: kotData.verhuurprijs,
                verhuurderId: kotData.verhuurderId,
            },
            include: {
                verhuurder: true, // Zorg ervoor dat je verhuurder data ophaalt
                reacties: true, //zorg ervoor dat de reacties worden opgehaald
            },
        });
        return Kot.from(newKot);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const assignHuurderToKot = async (kotId: number, huurderId: number) => {
    try {
        console.log(`Updating kotId: ${kotId}, huurderId: ${huurderId}`);
        //  Checken of huurderId al is toegewezen aan een ander kot
        const existingAssignment = await database.kot.findFirst({
            where: { huurderId: huurderId, NOT: { id: kotId } },
        });
        if (existingAssignment) {
            throw new Error(`Huurder is already assigned to another kot`);
        }
        // Update logica
        await database.kot.update({
            where: { id: kotId },
            data: { huurderId: huurderId },
            include: { verhuurder: true, reacties: true },
        });
        // updated kot ophalen
        const updatedKot = await database.kot.findUnique({
            where: { id: kotId },
            include: { verhuurder: true, reacties: true },
        });
        return updatedKot ? Kot.from(updatedKot) : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const assignVerhuurderToKot = async (kotId: number, verhuurderId: number) => {
    try {
        console.log(`Updating kotId: ${kotId}, verhuurderId: ${verhuurderId}`);

        // Update logica
        await database.kot.update({
            where: { id: kotId },
            data: { verhuurderId: verhuurderId },
            include: { verhuurder: true, reacties: true },
        });

        // updated kot ophalen
        const updatedKot = await database.kot.findUnique({
            where: { id: kotId },
            include: { verhuurder: true, reacties: true },
        });

        return updatedKot ? Kot.from(updatedKot) : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateKot = async (kotId: number, updatedKotData: KotInput) => {
    try {
        // kijken of het kot bestaat
        const existingKot = await getKotById(kotId);
        if (!existingKot) {
            throw new Error('Kot not found');
        }
        // update uitvoeren
        const updatedKot = await database.kot.update({
            where: { id: kotId },
            data: updatedKotData,
            include: { verhuurder: true, reacties: true },
        });
        return updatedKot ? Kot.from(updatedKot) : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteKot = async (kotId: number): Promise<void> => {
    try {
        // kijken of kot bestaat
        const existingKot = await getKotById(kotId);
        if (!existingKot) {
            throw new Error('Kot not found');
        }
        // Delete uitvoeren
        await database.kot.delete({
            where: { id: kotId },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getAllKoten,
    getKotById,
    createKot,
    assignHuurderToKot,
    assignVerhuurderToKot,
    updateKot,
    deleteKot,
    getKotenForVerhuurder,
};
