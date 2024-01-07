import { Huurder } from '../../../domain/model/Huurder';
import { Kot } from '../../../domain/model/Kot';
import { Reactie } from '../../../domain/model/Reactie';
import { Verhuurder } from '../../../domain/model/Verhuurder';

//gegeven
const verhuurder1 = {
    id: 1,
    naam: 'De Vries',
    email: 'devries@example.com',
    achternaam: 'Achternaam',
    password: '123456',
    iban: 'NL91ABNA0417164300',
    tel: '0612345678',
    role: null,
};
const verhuurder2 = verhuurder1;

const kot1 = {
    id: 1,
    locatie: 'Centrum',
    oppervlakte: 30,
    verhuurprijs: 500,
    actief: true,
    reacties: null,
    verhuurder: null,
};
const kot2 = kot1;

const reactie1 = {
    id: 1,
    reviewtekst: 'Uitstekend',
    score: 5,
    titel: 'Geweldige Ervaring',
};
const reactie2 = reactie1;
const huurder1 = new Huurder({
    id: 1,
    naam: 'Jansen',
    voorNaam: 'Jan',
    password: 'wachtwoord123',
    email: 'jan@example.com',
    straat: 'Hoofdstraat 1',
    postcode: '1000AA',
    telefoon: '0612345678',
    kot: null,
});
const huurder2 = new Huurder({
    id: 1,
    naam: 'Jansen',
    voorNaam: 'Jan',
    password: 'wachtwoord123',
    email: 'jan@example.com',
    straat: 'Hoofdstraat 1',
    postcode: '1000AA',
    telefoon: '0612345678',
    kot: null,
});

// testen voor huurder
test('given: geldige waarden voor huurder, when: huurder wordt aangemaakt, then: huurder wordt aangemaakt met die waarden', () => {
    // when
    const huurder = new Huurder(huurder1);

    // then
    expect(huurder.id).toEqual(huurder1.id);
    expect(huurder.naam).toEqual(huurder1.naam);
    expect(huurder.voorNaam).toEqual(huurder1.voorNaam);
    expect(huurder.password).toEqual(huurder1.password);
    expect(huurder.email).toEqual(huurder1.email);
    expect(huurder.straat).toEqual(huurder1.straat);
    expect(huurder.postcode).toEqual(huurder1.postcode);
    expect(huurder.telefoon).toEqual(huurder1.telefoon);
});

test('given: twee identieke huurder gegevens, when: equals methode wordt opgeroepen, then: ze worden als gelijk beschouwd', () => {
    // when
    const zijnGelijk = huurder1.equals(huurder2);

    // then
    expect(zijnGelijk).toBe(true);
});

// testen voor kot
test('Kot wordt correct aangemaakt met gegeven waarden', () => {
    const kot = new Kot(kot1);

    expect(kot.id).toEqual(kot1.id);
    expect(kot.locatie).toEqual(kot1.locatie);
    expect(kot.oppervlakte).toEqual(kot1.oppervlakte);
    expect(kot.verhuurprijs).toEqual(kot1.verhuurprijs);
});

test('given: twee identieke reactie gegevens, when: equals methode wordt opgeroepen, then: ze worden als gelijk beschouwd', () => {
    const kot1Instance = new Kot(kot1);
    const kot2Instance = new Kot(kot2);

    // when
    const zijnGelijk = kot1Instance.equals(kot2Instance);

    // then
    expect(zijnGelijk).toBe(true);
});

// testen voor reactie
test('Reactie wordt correct aangemaakt met gegeven waarden', () => {
    const reactie = new Reactie(reactie1);

    expect(reactie.id).toEqual(reactie1.id);
    expect(reactie.reviewtekst).toEqual(reactie1.reviewtekst);
    expect(reactie.score).toEqual(reactie1.score);
    expect(reactie.titel).toEqual(reactie1.titel);
});

test('given: twee identieke reactie gegevens, when: equals methode wordt opgeroepen, then: ze worden als gelijk beschouwd', () => {
    const reactie1Instance = new Reactie(reactie1);
    const reactie2Instance = new Reactie(reactie2);

    // when
    const zijnGelijk = reactie1Instance.equals(reactie2Instance);

    // then
    expect(zijnGelijk).toBe(true);
});

// testen voor verhuurder
test('Verhuurder wordt correct aangemaakt met gegeven waarden', () => {
    const verhuurder = new Verhuurder(verhuurder1);

    expect(verhuurder.id).toEqual(verhuurder1.id);
    expect(verhuurder.naam).toEqual(verhuurder1.naam);
    expect(verhuurder.email).toEqual(verhuurder1.email);
    expect(verhuurder.achternaam).toEqual(verhuurder1.achternaam);
    expect(verhuurder.iban).toEqual(verhuurder1.iban);
    expect(verhuurder.password).toEqual(verhuurder1.password);
    expect(verhuurder.tel).toEqual(verhuurder1.tel);
});

test('given: twee identieke verhuurder gegevens, when: equals methode wordt opgeroepen, then: ze worden als gelijk beschouwd', () => {
    const verhuurder1Instance = new Verhuurder(verhuurder1);
    const verhuurder2Instance = new Verhuurder(verhuurder2);

    // when
    const zijnGelijk = verhuurder1Instance.equals(verhuurder2Instance);

    // then
    expect(zijnGelijk).toBe(true);
});
