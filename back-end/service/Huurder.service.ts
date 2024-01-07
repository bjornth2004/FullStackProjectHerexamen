import HuurderDb from '../domain/data-access/Huurder.db';
import { HuurderInput } from '../types';

const createHuurder = async (huurderInput: HuurderInput) => {
    return await HuurderDb.createHuurder(huurderInput);
};

const getHuurders = async () => {
    return await HuurderDb.getAllHuurders();
};

const getHuurderById = async (id: number) => {
    return await HuurderDb.getHuurderById(id);
};

const deleteHuurderById = async (id: number) => {
    return HuurderDb.deleteHuurderById(id);
};

const updateHuurder = async (id: number, huurderInput: HuurderInput) => {
    return HuurderDb.updateHuurderById(id, huurderInput);
};

export default { createHuurder, getHuurders, getHuurderById, deleteHuurderById, updateHuurder };
