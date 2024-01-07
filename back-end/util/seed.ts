import { PrismaClient } from '@prisma/client';
//import { Reactie } from '../domain/model/Reactie';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Seed Reacties
    const reacties = await Promise.all([
        prisma.reactie.create({
            data: {
                reviewtekst: 'Heel mooi kot, goed onderhouden.',
                score: 5,
                titel: 'Geweldig kot!',
            },
        }),
        prisma.reactie.create({
            data: {
                reviewtekst: 'Ruim en licht, maar lawaaierig in de avond.',
                score: 3,
                titel: 'Ruim maar lawaaierig',
            },
        }),
    ]);

    // Seed Verhuurders
    const verhuurders = await Promise.all([
        prisma.verhuurder.create({
            data: {
                naam: 'Jan',
                achternaam: 'Jansen',
                password: await bcrypt.hash('Jan2002', 12),
                iban: 'NL91ABNA0417164300',
                tel: '+3247745678',
                email: 'janjansen@example.com',
                role: 'verhuurder',
            },
        }),
        prisma.verhuurder.create({
            data: {
                naam: 'Sara',
                achternaam: 'Smit',
                password: await bcrypt.hash('SaraSmit', 12),
                iban: 'NL91ABNA0417164301',
                tel: '+3247765431',
                email: 'sarasmit@example.com',
                role: 'verhuurder',
            },
        }),
        prisma.verhuurder.create({
            data: {
                naam: 'Admin',
                achternaam: 'Admin',
                password: await bcrypt.hash('Admin2024', 12),
                iban: '',
                tel: '',
                email: 'admin@example.com',
                role: 'admin',
            },
        }),
    ]);

    // Seed Kots
    const koten = await Promise.all([
        prisma.kot.create({
            data: {
                actief: true,
                oppervlakte: 50,
                locatie: 'Centrumstraat 1, 1000 Brussel',
                reacties: {
                    connect: [{ id: 1 }, { id: 2 }],
                },
                verhuurprijs: 500.0,
                verhuurder: {
                    connect: { id: 1 },
                },
            },
        }),
        prisma.kot.create({
            data: {
                actief: false,
                oppervlakte: 75,
                locatie: 'Hoofdweg 2, 1000 Brussel',
                verhuurprijs: 750.0,
                verhuurder: {
                    connect: { id: 2 },
                },
            },
        }),
        prisma.kot.create({
            data: {
                actief: false,
                oppervlakte: 65,
                locatie: 'Hoofdweg 3, 1000 Brussel',
                reacties: {
                    connect: [{ id: 1 }],
                },
                verhuurprijs: 620.0,
                verhuurder: {
                    connect: { id: 2 },
                },
            },
        }),
    ]);

    // Seed Huurders
    const huurders = await Promise.all([
        prisma.huurder.create({
            data: {
                naam: 'Piet',
                voorNaam: 'Pietersen',
                password: 'veiligWachtwoord123',
                email: 'pietpietersen@example.com',
                straat: 'Zijstraat 2',
                postcode: '2000',
                telefoon: '0612345679',

                kot: {
                    connect: {
                        id: koten[1].id,
                    },
                },
            },
        }),
        prisma.huurder.create({
            data: {
                naam: 'Klaas',
                voorNaam: 'Klaassen',
                password: 'sterkWachtwoord123',
                email: 'klaasklaassen@example.com',
                straat: 'Hoofdweg 3',
                postcode: '3000',
                telefoon: '0612345680',
            },
        }),
    ]);

    // Log de aangemaakte data
    console.log({
        verhuurders,
        koten,
        huurders,
        reacties,
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
