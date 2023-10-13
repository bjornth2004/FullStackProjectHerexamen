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

    constructor(huurder: {
        naam: string;
        id: number;
        voorNaam: string;
        password: string;
        email: string;
        straat: string;
        postcode: string;
        telefoon: string;
    }) {
        this.naam = huurder.naam;
        this.id = huurder.id;
        this.voorNaam = huurder.voorNaam;
        this.password = huurder.password;
        this.email = huurder.email;
        this.straat = huurder.straat;
        this.postcode = huurder.postcode;
        this.telefoon = huurder.telefoon;
    }

    //addHuurderToKot(huurder: Huurder) { - ZOIETS MOETEN WE OOK NOG IMPLEMENTEREN MAAR NI HIER VGM
    //   this.huurders.push(huurder);
    //}

    equals(naam, id, voorNaam, password, email, straat, postcode, telefoon): boolean {
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
