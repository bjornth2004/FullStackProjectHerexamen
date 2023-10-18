import HuurderDb from '../domain/data-access/Huurder.db';
import { Huurder } from '../domain/model/Huurder';
import { HuurderInput } from '../types';

const createHuurder = ({
    naam,
    id,
    voorNaam,
    password,
    email,
    straat,
    postcode,
    telefoon,
}: //Weeral destructuren
HuurderInput): Huurder => {
    const huurder = new Huurder({
        //Nieuwe huurder aanmaken
        naam,
        id,
        voorNaam,
        password,
        email,
        straat,
        postcode,
        telefoon,
    });
    return HuurderDb.createHuurder(huurder);
};

export default { createHuurder };
