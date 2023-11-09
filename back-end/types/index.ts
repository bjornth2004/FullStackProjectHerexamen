type HuurderInput = {
    naam?: string;
    id?: number;
    voorNaam?: string;
    password?: string;
    email?: string;
    straat?: string;
    postcode?: string;
    telefoon?: string;
};

type VerhuurderInput = {
    id?: number;
    naam?: string;
    achternaam?: string;
    login?: boolean;
    pass?: string;
    iban?: string;
    tel?: number;
    email?: string;
};

type KotInput = {
    id?: number;
    actief?: boolean;
    oppervlakte?: number;
    locatie?: string;
    verhuurprijs?: number;
    // huurder?: HuurderInput[]; // mss [] erachter zetten
    // verhuurder?: VerhuurderInput[];
    huurder?:HuurderInput;
    verhuurder?: VerhuurderInput;
};

export { HuurderInput, VerhuurderInput, KotInput };
