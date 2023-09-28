class Verhuurder {
    id: number;
    naam: string;
    achternaam: string;
    login: boolean;
    pass: number;
    iban: string;
    tel: number;
    email: string;

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

    equals(otherVerhuurder: Verhuurder): boolean {
        return this.id == otherVerhuurder.id;
    }
}
  