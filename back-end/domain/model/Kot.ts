import { Huurder } from './Huurder';
import { Verhuurder } from './Verhuurder';

export class Kot {
    readonly id: number;
    readonly huurder: Huurder[];
    readonly verhuurder: Verhuurder[];
    readonly actief: boolean;
    readonly oppervlakte: number;
    readonly locatie: string;
    readonly verhuurprijs: number;

    constructor(kot: {
        id: number;
        huurder: Huurder[];
        verhuurder: Verhuurder[];
        actief: boolean;
        oppervlakte: number;
        locatie: string;
        verhuurprijs: number;
    }) {
        this.id = kot.id;
        this.huurder = kot.huurder || [];
        this.verhuurder = kot.verhuurder || [];
        this.actief = kot.actief;
        this.oppervlakte = kot.oppervlakte;
        this.locatie = kot.locatie;
        this.verhuurprijs = kot.verhuurprijs;
    }

    addHuurderToKot(huurder: Huurder) {
        this.huurder.push(huurder);
    }

    addVerhuurderToKot(verhuurder: Verhuurder) {
        this.verhuurder.push(verhuurder);
    }

    equals({ id, huurder, verhuurder, actief, oppervlakte, locatie, verhuurprijs }): boolean {
        return (
            this.id == id &&
            this.huurder == huurder &&
            this.verhuurder == verhuurder &&
            this.actief == actief &&
            this.oppervlakte == oppervlakte &&
            this.locatie == locatie &&
            this.verhuurprijs == verhuurprijs
        );
    }
}
