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

export default { createVerhuurder };
