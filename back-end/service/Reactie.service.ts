import ReactieDb from '../domain/data-access/Reactie.db';
import { ReactieInput } from '../types';

const createReactie = async (reactieInput: ReactieInput) => {
    return await ReactieDb.createReactie(reactieInput);
};

const getReacties = async () => {
    return await ReactieDb.getAllReacties();
};

const getReactieById = async (id: number) => {
    return await ReactieDb.getReactieById(id);
};

const assignReactieToKot = async (reactieId: number, kotId: number) => {
    // Deze functie koppelt een reactie aan een kot.
    return await ReactieDb.assignReactieToKot(reactieId, kotId);
};

const removeReactieFromKot = async (reactieId: number, kotId: number) => {
    // Deze functie verwijderd een reactie van een kot.
    return await ReactieDb.removeReactieFromKot(reactieId, kotId);
};

const updateReactie = async (reactieId: number, reactieInput: ReactieInput) => {
    return await ReactieDb.updateReactie(reactieId, reactieInput);
};

const removeReactie = async (reactieId: number) => {
    return await ReactieDb.removeReactie(reactieId);
};

export default {
    createReactie,
    getReacties,
    getReactieById,
    assignReactieToKot,
    removeReactieFromKot,
    updateReactie,
    removeReactie,
};
