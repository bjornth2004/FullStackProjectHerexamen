import { Huurder } from "./Huurder";

class Kot {
    id: number;
    huurder: Huurder;
    verhuurder: string;
    actief: boolean;
    oppervlakte: number;
    locatie: string;
    verhuurprijs: number;

    constructor(kot: {
        id: number;
        huurder: Huurder;
        verhuurder: string;
        actief: boolean;
        oppervlakte: number;
        locatie: string;
        verhuurprijs: number;
    }) {
        this.id = kot.id;
        this.huurder = kot.huurder;
        this.verhuurder = kot.verhuurder;
        this.actief = kot.actief;
        this.oppervlakte = kot.oppervlakte;
        this.locatie = kot.locatie;
        this.verhuurprijs = kot.verhuurprijs;
    }

    equals(otherKot: Kot): boolean {
        return this.id == otherKot.id;
    }
}