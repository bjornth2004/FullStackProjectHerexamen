type Role = 'admin' | 'verhuurder';

type HuurderInput = {
    naam?: string;
    id?: number;
    voorNaam?: string;
    password?: string;
    role?: Role;
    email?: string;
    straat?: string;
    postcode?: string;
    telefoon?: string;
};

type VerhuurderInput = {
    id?: number;
    naam?: string;
    achternaam?: string;
    password?: string;
    iban?: string;
    tel?: string;
    email?: string;
};

type KotInput = {
    actief: boolean;
    oppervlakte: number;
    locatie: string;
    verhuurprijs: number;
    verhuurderId: number;
};

type ReactieInput = {
    id?: number;
    reviewtekst?: string;
    score?: number;
    titel?: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
};

export { HuurderInput, VerhuurderInput, KotInput, ReactieInput, AuthenticationResponse, Role };
