import VerhuurderService from '../../service/Verhuurder.service';
import VerhuurderDb from '../../domain/data-access/Verhuurder.db';
import { Verhuurder } from '../../domain/model/Verhuurder';
import * as bcrypt from 'bcrypt';

jest.mock('../../domain/data-access/Verhuurder.db');

let mockVerhuurderDbCreate: jest.Mock;
let mockVerhuurderDbGetById: jest.Mock;
let mockVerhuurderDbGetAll: jest.Mock;
let mockVerhuurderDbDelete: jest.Mock;
let mockVerhuurderDbUpdate: jest.Mock;

beforeEach(() => {
    mockVerhuurderDbCreate = jest.fn();
    mockVerhuurderDbGetById = jest.fn();
    mockVerhuurderDbGetAll = jest.fn();
    mockVerhuurderDbDelete = jest.fn();
    mockVerhuurderDbUpdate = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('mocked_hashed_password'),
    compare: jest.fn(),
}));

test('createVerhuurder slaat een nieuwe verhuurder op in de database', async () => {
    const verhuurderInput = {
        id: 3, // Unieke ID voor de nieuwe verhuurder
        naam: 'Klaas',
        achternaam: 'Meijer',
        password: 'wachtwoord123', // Wachtwoord dat gehasht moet worden
        iban: 'NL91ABNA0417164302',
        tel: '0612345679',
        email: 'klaas@example.com',
        role: 'verhuurder',
    };

    // Bestaat verhuurder in DB?
    VerhuurderDb.getVerhuurderById = mockVerhuurderDbGetById.mockResolvedValue(null);
    // Aanmaken verhuurder in DB
    VerhuurderDb.createVerhuurder = mockVerhuurderDbCreate.mockResolvedValue({
        id: 3,
        ...verhuurderInput,
    });

    const result = await VerhuurderService.createVerhuurder(verhuurderInput);

    expect(mockVerhuurderDbGetById).toHaveBeenCalledWith(verhuurderInput.id);
    expect(bcrypt.hash).toHaveBeenCalledWith('wachtwoord123', 12); // Controleer of bcrypt.hash is aangeroepen met het juiste wachtwoord
    expect(mockVerhuurderDbCreate).toHaveBeenCalledWith({
        id: 3,
        naam: 'Klaas',
        achternaam: 'Meijer',
        password: expect.any(String), //gehasht wachtwoord
        iban: 'NL91ABNA0417164302',
        tel: '0612345679',
        email: 'klaas@example.com',
        role: 'verhuurder',
    });

    // Controleer of het resultaat overeenkomt met de verwachte output
    expect(result).toEqual({
        id: 3,
        naam: 'Klaas',
        achternaam: 'Meijer',
        password: expect.any(String), // gehast wachtwoord
        iban: 'NL91ABNA0417164302',
        tel: '0612345679',
        email: 'klaas@example.com',
        role: 'verhuurder',
    });
});

test('getVerhuurders haalt alle verhuurders op', async () => {
    const mockVerhuurders = [
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

    VerhuurderDb.getAllVerhuurders = mockVerhuurderDbGetAll.mockResolvedValue(mockVerhuurders);

    const result = await VerhuurderService.getVerhuurders();

    expect(mockVerhuurderDbGetAll).toHaveBeenCalled();
    expect(result).toEqual(mockVerhuurders);
});

test('getVerhuurderById haalt een specifieke verhuurder op', async () => {
    const verhuurderId = 1;
    const expectedVerhuurder = new Verhuurder({
        id: verhuurderId,
        naam: 'De Vries',
        achternaam: 'Jansen',
        password: '123456',
        iban: 'NL91ABNA0417164300',
        tel: '0612345678',
        email: 'devries@example.com',
        role: 'verhuurder',
    });

    VerhuurderDb.getVerhuurderById = mockVerhuurderDbGetById.mockResolvedValue(expectedVerhuurder);

    const result = await VerhuurderService.getVerhuurderById(verhuurderId);

    expect(mockVerhuurderDbGetById).toHaveBeenCalledWith(verhuurderId);
    expect(result).toEqual(expectedVerhuurder);
});

test('deleteVerhuurder verwijdert een verhuurder', async () => {
    const verhuurderId = 1;

    VerhuurderDb.deleteVerhuurder = mockVerhuurderDbDelete.mockResolvedValue(true);

    const result = await VerhuurderService.deleteVerhuurder(verhuurderId);

    expect(mockVerhuurderDbDelete).toHaveBeenCalledWith(verhuurderId);
    expect(result).toBe(true);
});

test('updateVerhuurder werkt een verhuurder bij', async () => {
    const verhuurderId = 1;
    const updatedVerhuurderInput = {
        naam: 'Bijgewerkt',
        achternaam: 'Veranderd',
    };

    VerhuurderDb.updateVerhuurder = mockVerhuurderDbUpdate.mockResolvedValue(true);

    const result = await VerhuurderService.updateVerhuurder(verhuurderId, updatedVerhuurderInput);

    expect(mockVerhuurderDbUpdate).toHaveBeenCalledWith(verhuurderId, updatedVerhuurderInput);
    expect(result).toBe(true);
});
