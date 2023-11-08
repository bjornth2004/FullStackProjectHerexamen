export type Kot = {
    id: number;
    huurder: Huurder[];
    verhuurder: number;
    actief: boolean;
    oppervlakte: number;
    locatie: string;
    verhuurprijs: number;
}

export type Huurder = {
    naam: string;
    id: number;
    voorNaam: string;
    password: string;
    email: string;
    straat: string;
    postcode: string;
    telefoon: string;
}