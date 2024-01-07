import { Verhuurder as VerhuurderPrisma } from '@prisma/client';
import { Role } from '../../types';

export class Verhuurder {
    readonly id: number;
    readonly naam: string;
    readonly achternaam: string;
    readonly password: string;
    readonly iban: string;
    readonly tel: string;
    readonly email: string;
    readonly role: Role;

    constructor(verhuurder: {
        id: number;
        naam: string;
        achternaam: string;
        password: string;
        iban: string;
        tel: string;
        email: string;
        role: Role;
    }) {
        this.id = verhuurder.id;
        this.naam = verhuurder.naam;
        this.achternaam = verhuurder.achternaam;
        this.password = verhuurder.password;
        this.iban = verhuurder.iban;
        this.tel = verhuurder.tel;
        this.email = verhuurder.email;
        this.role = verhuurder.role;
    }

    validate(verhuurder: { password: string; role: Role }) {
        if (!verhuurder.password?.trim()) {
            //.trim zorgt voor enkel spaties check
            throw new Error('Password is required');
        }
    }

    equals({ id, naam, achternaam, password, iban, tel, email, role }): boolean {
        return (
            this.id == id &&
            this.naam == naam &&
            this.achternaam == achternaam &&
            this.password == password &&
            this.iban == iban &&
            this.tel == tel &&
            this.email == email &&
            this.role == role
        );
    }

    static from(verhuurderPrisma: VerhuurderPrisma & { role: Role }): Verhuurder {
        return new Verhuurder({
            id: verhuurderPrisma.id,
            naam: verhuurderPrisma.naam,
            achternaam: verhuurderPrisma.achternaam,
            password: verhuurderPrisma.password,
            iban: verhuurderPrisma.iban,
            tel: verhuurderPrisma.tel,
            email: verhuurderPrisma.email,
            role: verhuurderPrisma.role as Role, // Cast naar Role
        });
    }
}
