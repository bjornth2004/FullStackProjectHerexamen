import HuurderService from '../../service/Huurder.service';
import HuurderDb from '../../domain/data-access/Huurder.db';
import { Huurder } from '../../domain/model/Huurder';

jest.mock('../../domain/data-access/Huurder.db');

let mockHuurderDbCreate: jest.Mock;
let mockHuurderDbGetById: jest.Mock;
let mockHuurderDbDelete: jest.Mock;
let mockHuurderDbUpdate: jest.Mock;

beforeEach(() => {
    mockHuurderDbCreate = jest.fn();
    mockHuurderDbGetById = jest.fn();
    mockHuurderDbDelete = jest.fn();
    mockHuurderDbUpdate = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('gegeven correcte huurder data, wanneer huurder word gemaakt, dan word het opgeslagen in de database', async () => {
    // given
    const huurderData = {
        id: 1,
        naam: 'Jansen',
        voorNaam: 'Jan',
        password: 'wachtwoord123',
        email: 'jan@example.com',
        straat: 'Hoofdstraat 1',
        postcode: '1000AA',
        telefoon: '0612345678',
        kot: null, // Geen Kot toegewezen
    };

    HuurderDb.createHuurder = mockHuurderDbCreate.mockResolvedValue({ id: 1, ...huurderData });

    // when
    await HuurderService.createHuurder(huurderData);

    // then
    expect(HuurderDb.createHuurder).toHaveBeenCalledTimes(1);
    expect(HuurderDb.createHuurder).toHaveBeenCalledWith(huurderData);
});

test('gegeven huurder ID, wanneer huurder word opgevraagd, dan word de correcte huurder terug gegeven', async () => {
    // given
    const huurderId = 1;
    const expectedHuurder = new Huurder({
        id: 1,
        naam: 'Jansen',
        voorNaam: 'Jan',
        password: 'wachtwoord123',
        email: 'jan@example.com',
        straat: 'Hoofdstraat 1',
        postcode: '1000AA',
        telefoon: '0612345678',
        kot: null, // Geen Kot toegewezen
    });

    HuurderDb.getHuurderById = mockHuurderDbGetById.mockResolvedValue(expectedHuurder);

    // when
    const result = await HuurderService.getHuurderById(huurderId);

    // then
    expect(mockHuurderDbGetById).toHaveBeenCalledTimes(1);
    expect(mockHuurderDbGetById).toHaveBeenCalledWith(huurderId);
    expect(result).toEqual(expectedHuurder);
});

test('gegeven huurder ID, wanneer huurder wordt verwijderd, dan wordt het succesvol uit de database verwijderd', async () => {
    const huurderId = 1;
    HuurderDb.deleteHuurderById = mockHuurderDbDelete.mockResolvedValue(true);

    // when
    const result = await HuurderService.deleteHuurderById(huurderId);

    // then
    expect(mockHuurderDbDelete).toHaveBeenCalledWith(huurderId);
    expect(result).toBe(true);
});

test('gegeven huurder ID en update data, wanneer huurder wordt bijgewerkt, dan wordt het succesvol bijgewerkt in de database', async () => {
    const huurderId = 1;
    const updateData = {
        naam: 'VeranderdNaam',
        voorNaam: 'Jan',
        password: 'nieuwWachtwoord123',
        email: 'janveranderd@example.com',
        straat: 'Zijstraat 2',
        postcode: '2000BB',
        telefoon: '0698765432',
        kot: null,
    };
    HuurderDb.updateHuurderById = mockHuurderDbUpdate.mockResolvedValue(true);

    // when
    const result = await HuurderService.updateHuurder(huurderId, updateData);

    // then
    expect(mockHuurderDbUpdate).toHaveBeenCalledWith(huurderId, updateData);
    expect(result).toBe(true);
});
