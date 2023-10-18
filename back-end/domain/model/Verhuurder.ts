export class Verhuurder {
    readonly id: number;
    readonly naam: string;
    readonly achternaam: string;
    readonly login: boolean;
    readonly pass: number;
    readonly iban: string;
    readonly tel: number;
    readonly email: string;

    constructor(verhuurder: {
        id: number;
        naam: string;
        achternaam: string;
        login: boolean;
        pass: number;
        iban: string;
        tel: number;
        email: string;
    }) {
        this.id = verhuurder.id;
        this.naam = verhuurder.naam;
        this.achternaam = verhuurder.achternaam;
        this.login = verhuurder.login;
        this.pass = verhuurder.pass;
        this.iban = verhuurder.iban;
        this.tel = verhuurder.tel;
        this.email = verhuurder.email;
    }

    equals({ id, naam, achternaam, login, pass, iban, tel, email }): boolean {
        return (
            this.id == id &&
            this.naam == naam &&
            this.achternaam == achternaam &&
            this.login == login &&
            this.pass == pass &&
            this.iban == iban &&
            this.tel == tel &&
            this.email == email
        );
    }
}
