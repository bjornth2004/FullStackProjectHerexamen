export class Huurder {
    readonly id: number;
    readonly naam: string;
    readonly voorNaam: string
    readonly password: string;
    readonly email: string;
    readonly straat: string;
    readonly postcode: string;
    readonly telefoon: string;

    constructor(huurder:{naam: string, id: number, voorNaam: string, password: string, email: string, straat: string, postcode: string, telefoon: string}) {
      this.naam = huurder.naam;
      this.id = huurder.id;
      this.voorNaam = huurder.voorNaam;
      this.password = huurder.password;
      this.email = huurder.email;
      this.straat = huurder.straat;
      this.postcode = huurder.postcode;
      this.telefoon = huurder.telefoon;
    }
  
    equals(otherHuurder: Huurder): boolean {
      return this.id == otherHuurder.id;
    }
  }
  