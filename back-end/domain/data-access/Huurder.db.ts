import database from '../../util/database'; // Importeer je database instance

// Create
const createHuurder = async (huurderData) => {
    return await database.huurder.create({
        data: huurderData,
    });
};

// Read by ID
const getHuurderById = async (id) => {
    return await database.huurder.findUnique({
        where: { id },
        include: {
            //INCLUDE TOEGEVOEGD
            kot: true,
        },
    });
};

// Read all
const getAllHuurders = async () => {
    return await database.huurder.findMany({
        include: {
            //INCLUDE TOEGEVOEGD
            kot: true,
        },
    });
};

const deleteHuurderById = async (id) => {
    //terugvinden van de huurder me koten die overeenkomen
    const huurderWithKot = await database.huurder.findUnique({
        where: { id },
        include: { kot: true },
    });

    if (!huurderWithKot) {
        // wanneer huurder niet bestaat
        return null;
    }

    // Verwijder het kot van de huurder
    if (huurderWithKot.kot) {
        await database.kot.deleteMany({
            where: { huurderId: id },
        });
    }

    // Verwijder de huurder
    await database.huurder.delete({
        where: { id },
    });

    return huurderWithKot; //  kot Teruggeven van de verwijderde huurder & zijn kot
};

const updateHuurderById = async (id, huurderData) => {
    // Vinden van bestaande huurder
    const existingHuurder = await database.huurder.findUnique({
        where: { id },
    });

    if (!existingHuurder) {
        return null;
    }

    // Update de huurder
    const updatedHuurder = await database.huurder.update({
        where: { id },
        data: huurderData,
        include: {
            kot: true,
        },
    });

    return updatedHuurder; // teruggeven van updated Huurder
};

export default {
    createHuurder,
    getHuurderById,
    getAllHuurders,
    deleteHuurderById,
    updateHuurderById,
};
