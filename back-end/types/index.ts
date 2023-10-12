import { Huurder } from '../domain/model/Huurder';

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
    naam?: string;
    achternaam?: string;
    login?: boolean;
    pass?: number;
    iban?: string;
    tel?: number;
    email?: string;
};

type KotInput = {
    id?: number;
    huurder?: Huurder; // Assuming you import Huurder at the top
    verhuurder?: string;
    actief?: boolean;
    oppervlakte?: number;
    locatie?: string;
    verhuurprijs?: number;
}; //--> ook shit inmorten

export { KotInput, HuurderInput, VerhuurderInput };
