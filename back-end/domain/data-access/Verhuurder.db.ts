import { Verhuurder } from '../model/Verhuurder';

const verhuurders = []; //database is voor later

const createVerhuurder = ({
    id,
    naam,
    achternaam,
    login,
    pass,
    iban,
    tel,
    email,
}: Verhuurder): Verhuurder => {
    //heeft aantal voordelen om te destructuren
    const verhuurder = new Verhuurder({
        //naam: naam, - Moet niet altijd daar is een short versie voor:
        id,
        naam,
        achternaam,
        login,
        pass,
        iban,
        tel,
        email,
    });
    verhuurders.push(verhuurder); //Als een huurder binnekomt willen we die toevoegen aan onze huurders array
    return verhuurder; //
};

const getVerhuurderById = (id: number): Verhuurder | null => {
    return null;
};

const getAllVerhuurders = (): Verhuurder[] => verhuurders;

export default {
    createVerhuurder,
    getVerhuurderById,
    getAllVerhuurders,
};
