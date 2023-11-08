export type Kot = {
    id: number;
    huurder: Huurder[];
    verhuurder: Verhuurder[];
    actief: boolean;
    oppervlakte: number;
    locatie: string;
    verhuurprijs: number;
};

export type Huurder = {
    naam: string;
    id: number;
    voorNaam: string;
    password: string;
    email: string;
    straat: string;
    postcode: string;
    telefoon: string;
};

export type Verhuurder = {
    id: number;
    naam: string;
    achternaam: string;
    login: boolean;
    pass: string;
    iban: string;
    tel: number;
    email: string;
};

