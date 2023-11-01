import VerhuurderDb from '../domain/data-access/Verhuurder.db';
import { Verhuurder } from '../domain/model/Verhuurder';
import { VerhuurderInput } from '../types';

const createVerhuurder = ({
    id,
    naam,
    achternaam,
    login,
    pass,
    iban,
    tel,
    email,
}: //Weeral destructuren
VerhuurderInput): Verhuurder => {
    const verhuurder = new Verhuurder({
        //Nieuwe verhuurder aanmaken
        id,
        naam,
        achternaam,
        login,
        pass,
        iban,
        tel,
        email,
    });
    return VerhuurderDb.createVerhuurder(verhuurder);
};

const getVerhuurders = () => {
    return VerhuurderDb.getAllVerhuurders();
};

const getVerhuurderById = (id: number) => {
    return VerhuurderDb.getVerhuurderById(id)
}

export default { createVerhuurder, getVerhuurders, getVerhuurderById };
