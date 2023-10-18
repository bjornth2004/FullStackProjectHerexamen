import { Kot } from '../model/Kot';

const koten = []; //database is voor later

const createKot = ({ id, actief, oppervlakte, locatie, verhuurprijs }: Kot): Kot => {
    //heeft aantal voordelen om te destructuren
    const kot = new Kot({
        //naam: naam, - Moet niet altijd daar is een short versie voor:
        id,
        huurder: [],
        verhuurder: [],
        actief,
        oppervlakte,
        locatie,
        verhuurprijs,
    });
    koten.push(kot); //Als een huurder binnekomt willen we die toevoegen aan onze huurders array
    return kot; //
};

const getKotByHuurderAndVerhuurder = ({
    //LATER GAAN WE DEZE BLIJKBAAR NODIG HEBBEN VOLGENS LABO
    huurderId,
    verhuurderId,
}: {
    huurderId: number;
    verhuurderId: number;
}): Kot | null => {
    return null;
};

const getAllKoten = (): Kot[] => koten;

export default {
    createKot,
    getKotByHuurderAndVerhuurder,
    getAllKoten,
};
