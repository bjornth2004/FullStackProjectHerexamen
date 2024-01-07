import {
    Verhuurder as VerhuurderPrisma,
    Kot as KotPrisma,
    Reactie as ReactiePrisma,
} from '@prisma/client';

import { Verhuurder } from './Verhuurder'; // Zorg ervoor dat het pad klopt
import { Reactie } from './Reactie'; // Zorg ervoor dat het pad klopt
import { Role } from '../../types'; // Zorg ervoor dat het pad klopt

export class Kot {
    readonly id: number;
    readonly actief: boolean;
    readonly oppervlakte: number;
    readonly locatie: string;
    readonly reacties: Reactie[];
    readonly verhuurprijs: number;
    readonly verhuurder: Verhuurder;

    constructor(kot: {
        id: number;
        actief: boolean;
        oppervlakte: number;
        locatie: string;
        reacties: Reactie[];
        verhuurprijs: number;
        verhuurder: Verhuurder;
    }) {
        this.id = kot.id;
        this.actief = kot.actief;
        this.oppervlakte = kot.oppervlakte;
        this.locatie = kot.locatie;
        this.reacties = kot.reacties;
        this.verhuurprijs = kot.verhuurprijs;
        this.verhuurder = kot.verhuurder;
    }

    equals({ id, actief, oppervlakte, locatie, verhuurprijs }): boolean {
        return (
            this.id === id &&
            this.actief === actief &&
            this.oppervlakte === oppervlakte &&
            this.locatie === locatie &&
            this.verhuurprijs === verhuurprijs
        );
    }

    static from(
        kotPrisma: KotPrisma & {
            verhuurder: VerhuurderPrisma;
            reacties: ReactiePrisma[];
        }
    ): Kot {
        // Veronderstelt dat de role al gevalideerd is voordat deze methode wordt aangeroepen
        const role: Role = kotPrisma.verhuurder.role as Role;

        return new Kot({
            id: kotPrisma.id,
            actief: kotPrisma.actief,
            oppervlakte: kotPrisma.oppervlakte,
            locatie: kotPrisma.locatie,
            reacties: kotPrisma.reacties.map(Reactie.from),
            verhuurprijs: kotPrisma.verhuurprijs,
            verhuurder: Verhuurder.from({
                ...kotPrisma.verhuurder,
                role: role, // Gebruik de gecaste Role
            }),
        });
    }
}
