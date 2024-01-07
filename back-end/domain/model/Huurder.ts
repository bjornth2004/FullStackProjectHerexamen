import { Huurder as HuurderPrisma, Kot as KotPrisma } from '@prisma/client';
import { Kot } from './Kot';

export class Huurder {
    //Als die export weg zou zijn dan zou dit intern zijn, best altijd export ervoor zetten
    readonly id: number;
    readonly naam: string;
    readonly voorNaam: string;
    readonly password: string;
    readonly email: string;
    readonly straat: string;
    readonly postcode: string;
    readonly telefoon: string;
    readonly kot: Kot | null;

    constructor(huurder: {
        naam: string;
        id: number;
        voorNaam: string;
        password: string;
        email: string;
        straat: string;
        postcode: string;
        telefoon: string;
        kot: Kot | null;
    }) {
        this.naam = huurder.naam;
        this.id = huurder.id;
        this.voorNaam = huurder.voorNaam;
        this.password = huurder.password;
        this.email = huurder.email;
        this.straat = huurder.straat;
        this.postcode = huurder.postcode;
        this.telefoon = huurder.telefoon;
        this.kot = huurder.kot;
    }

    static from({
        naam,
        id,
        voorNaam,
        password,
        email,
        straat,
        postcode,
        telefoon,
        kot,
    }: HuurderPrisma & { kot: KotPrisma }) {
        return new Huurder({
            naam,
            id,
            voorNaam,
            password,
            email,
            straat,
            postcode,
            telefoon,
            kot: Kot.from({
                ...kot,
                verhuurder: {
                    id: 0,
                    naam: '',
                    achternaam: '',
                    password: '',
                    iban: '',
                    tel: '',
                    email: '',
                    role: '',
                },
                reacties: [],
            }),
        });
    }

    equals({ naam, id, voorNaam, password, email, straat, postcode, telefoon }): boolean {
        return (
            this.naam === naam &&
            this.id === id &&
            this.voorNaam === voorNaam &&
            this.password === password &&
            this.email === email &&
            this.straat === straat &&
            this.postcode === postcode &&
            this.telefoon === telefoon
        );
    }
}
