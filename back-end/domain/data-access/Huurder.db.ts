import { Huurder } from '../model/Huurder';

const huurders = []; //database is voor later

const createHuurder = ({
    naam,
    id,
    voorNaam,
    password,
    email,
    straat,
    postcode,
    telefoon,
}: Huurder): Huurder => {
    //heeft aantal voordelen om te destructuren
    const huurder = new Huurder({
        //naam: naam, - Moet niet altijd daar is een short versie voor:
        naam,
        id,
        voorNaam,
        password,
        email,
        straat,
        postcode,
        telefoon,
    });
    huurders.push(huurder); //Als een huurder binnekomt willen we die toevoegen aan onze huurders array
    return huurder; //
};

const getHuurderById = (id: number): Huurder | null => {
    return null;
};

const getAllHuurders = (): Huurder[] => huurders;

export default {
    createHuurder,
    getHuurderById,
    getAllHuurders,
};
