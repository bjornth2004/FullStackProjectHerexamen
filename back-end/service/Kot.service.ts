import HuurderDb from '../domain/data-access/Huurder.db';
import KotDb from '../domain/data-access/Kot.db';
import VerhuurderDb from '../domain/data-access/Verhuurder.db';
import { Kot } from '../domain/model/Kot';
import { KotInput } from '../types';

const createKot = ({
    id,
    huurder,
    verhuurder,
    actief,
    oppervlakte,
    locatie,
    verhuurprijs,
}: KotInput): Kot => {
    //huurder en verhuurder ophalen
    const verhuurderEntity = VerhuurderDb.getVerhuurderById(verhuurder[0].id);
    const huurderEntity = HuurderDb.getHuurderById(huurder[0].id);

    const kot = new Kot({
        //nieuw kot aanmaken
        id,
        huurder: [huurderEntity], // assuming you want to initialize with the retrieved huurder
        verhuurder: [verhuurderEntity], // assuming you want to initialize with the retrieved verhuurder
        actief,
        oppervlakte,
        locatie,
        verhuurprijs,
    });

    return KotDb.createKot(kot);
};

export default { createKot };
