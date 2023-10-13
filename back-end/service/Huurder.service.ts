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
    //const verhuurder = verhuurderDB.getHuurderById({ id: huurderInput.id }); --> PIECK zijn notaties, wij moeten da wss ook nog toepassen neem ik aan maar dan met kot en verhuurder
    //const kot = kotDB.getKotById({ id: kotInput.id });
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
        //verhuurder: verhuurderInput,
        //kot: kotInput,
    });
    return HuurderDb.createHuurder(huurder);
};

export default { createHuurder };
