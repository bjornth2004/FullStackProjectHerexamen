import KotService from '../../service/Kot.service';
import KotDb from '../../domain/data-access/Kot.db';
import { Kot } from '../../domain/model/Kot';
import { Verhuurder } from '../../domain/model/Verhuurder';

jest.mock('../../domain/data-access/Kot.db');

let mockKotDbCreate: jest.Mock;
let mockKotDbGetById: jest.Mock;
let mockKotDbGetAll: jest.Mock;
let mockKotDbAssignHuurder: jest.Mock;
let mockKotDbAssignVerhuurder: jest.Mock;
let mockKotDbDelete: jest.Mock;
let mockKotDbUpdate: jest.Mock;
let mockKotDbGetKotenForVerhuurder: jest.Mock;

beforeEach(() => {
    mockKotDbCreate = jest.fn();
    mockKotDbGetById = jest.fn();
    mockKotDbGetAll = jest.fn();
    mockKotDbAssignHuurder = jest.fn();
    mockKotDbAssignVerhuurder = jest.fn();
    mockKotDbDelete = jest.fn();
    mockKotDbUpdate = jest.fn();
    mockKotDbGetKotenForVerhuurder = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('createKot slaat een nieuw kot op in de database', async () => {
    const kotInput = {
        actief: true,
        oppervlakte: 30,
        locatie: 'Centrum',
        verhuurprijs: 500,
        verhuurderId: 1,
    };

    KotDb.createKot = mockKotDbCreate.mockResolvedValue({ id: 1, ...kotInput });

    const result = await KotService.createKot(kotInput);

    expect(mockKotDbCreate).toHaveBeenCalledWith(kotInput);
    expect(result).toEqual({ id: 1, ...kotInput });
});

test('returns koten for a specific verhuurder', async () => {
    const verhuurderEmail = 'verhuurder@example.com';
    const mockKotenForVerhuurder = [
        new Verhuurder({
            id: 1,
            naam: 'De Vries',
            achternaam: 'Jansen',
            password: '123456',
            iban: 'NL91ABNA0417164300',
            tel: '0612345678',
            email: 'devries@example.com',
            role: 'verhuurder',
        }),
        new Verhuurder({
            id: 2,
            naam: 'Van Dijk',
            achternaam: 'Pietersen',
            password: '654321',
            iban: 'NL91ABNA0417164301',
            tel: '0698765432',
            email: 'vandijk@example.com',
            role: 'verhuurder',
        }),
    ];
    KotDb.getKotenForVerhuurder =
        mockKotDbGetKotenForVerhuurder.mockResolvedValue(mockKotenForVerhuurder);

    const result = await KotService.getKoten({ email: verhuurderEmail, role: 'verhuurder' });

    expect(mockKotDbGetKotenForVerhuurder).toHaveBeenCalledWith(verhuurderEmail);
    expect(result).toEqual(mockKotenForVerhuurder);
});

test('getKotById haalt een specifiek kot op', async () => {
    const kotId = 1;
    const expectedKot = new Kot({
        id: kotId,
        actief: true,
        oppervlakte: 30,
        locatie: 'Centrum',
        verhuurprijs: 500,
        reacties: [],
        verhuurder: null,
    });

    KotDb.getKotById = mockKotDbGetById.mockResolvedValue(expectedKot);

    const result = await KotService.getKotById(kotId);

    expect(mockKotDbGetById).toHaveBeenCalledWith(kotId);
    expect(result).toEqual(expectedKot);
});

test('assignHuurderToKot wijst een huurder toe aan een kot', async () => {
    const kotId = 1;
    const huurderId = 2;

    KotDb.assignHuurderToKot = mockKotDbAssignHuurder.mockResolvedValue(true);

    const result = await KotService.assignHuurderToKot(kotId, huurderId);

    expect(mockKotDbAssignHuurder).toHaveBeenCalledWith(kotId, huurderId);
    expect(result).toBe(true);
});

test('assignVerhuurderToKot wijst een verhuurder toe aan een kot', async () => {
    const kotId = 1;
    const verhuurderId = 3;

    KotDb.assignVerhuurderToKot = mockKotDbAssignVerhuurder.mockResolvedValue(true);

    const result = await KotService.assignVerhuurderToKot(kotId, verhuurderId);

    expect(mockKotDbAssignVerhuurder).toHaveBeenCalledWith(kotId, verhuurderId);
    expect(result).toBe(true);
});

test('deleteKot verwijdert een kot', async () => {
    const kotId = 1;

    KotDb.deleteKot = mockKotDbDelete.mockResolvedValue(true);

    const result = await KotService.deleteKot(kotId);

    expect(mockKotDbDelete).toHaveBeenCalledWith(kotId);
    expect(result).toBe(true);
});

test('updateKot update een kot', async () => {
    const kotId = 1;
    const kotInput = {
        actief: false,
        oppervlakte: 35,
        locatie: 'Buitenwijk',
        verhuurprijs: 550,
        verhuurderId: 1,
    };

    KotDb.updateKot = mockKotDbUpdate.mockResolvedValue(true);

    const result = await KotService.updateKot(kotId, kotInput);

    expect(mockKotDbUpdate).toHaveBeenCalledWith(kotId, kotInput);
    expect(result).toBe(true);
});
