import ReactieService from '../../service/Reactie.service';
import ReactieDb from '../../domain/data-access/Reactie.db';
import { Reactie } from '../../domain/model/Reactie';

jest.mock('../../domain/data-access/Reactie.db');

let mockReactieDbCreate: jest.Mock;
let mockReactieDbGetById: jest.Mock;
let mockReactieDbGetAll: jest.Mock;
let mockReactieDbAssignToKot: jest.Mock;
let mockReactieDbRemoveFromKot: jest.Mock;
let mockReactieDbUpdate: jest.Mock;
let mockReactieDbRemove: jest.Mock;

beforeEach(() => {
    mockReactieDbCreate = jest.fn();
    mockReactieDbGetById = jest.fn();
    mockReactieDbGetAll = jest.fn();
    mockReactieDbAssignToKot = jest.fn();
    mockReactieDbRemoveFromKot = jest.fn();
    mockReactieDbUpdate = jest.fn();
    mockReactieDbRemove = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('createReactie slaat een nieuwe reactie op in de database', async () => {
    const reactieInput = {
        reviewtekst: 'Uitstekende ervaring!',
        score: 5,
        titel: 'Geweldig Kot',
    };

    ReactieDb.createReactie = mockReactieDbCreate.mockResolvedValue({ id: 1, ...reactieInput });

    const result = await ReactieService.createReactie(reactieInput);

    expect(mockReactieDbCreate).toHaveBeenCalledWith(reactieInput);
    expect(result).toEqual({ id: 1, ...reactieInput });
});

test('getReacties haalt alle reacties op', async () => {
    const mockReacties = [
        new Reactie({ id: 1, reviewtekst: 'Geweldig', score: 4, titel: 'Mooi Kot' }),
        new Reactie({ id: 2, reviewtekst: 'Goed', score: 3, titel: 'Goed Kot' }),
    ];

    ReactieDb.getAllReacties = mockReactieDbGetAll.mockResolvedValue(mockReacties);

    const result = await ReactieService.getReacties();

    expect(mockReactieDbGetAll).toHaveBeenCalled();
    expect(result).toEqual(mockReacties);
});

test('getReactieById haalt een specifieke reactie op', async () => {
    const reactieId = 1;
    const expectedReactie = new Reactie({
        id: reactieId,
        reviewtekst: 'Uitstekende ervaring!',
        score: 5,
        titel: 'Geweldig Kot',
    });

    ReactieDb.getReactieById = mockReactieDbGetById.mockResolvedValue(expectedReactie);

    const result = await ReactieService.getReactieById(reactieId);

    expect(mockReactieDbGetById).toHaveBeenCalledWith(reactieId);
    expect(result).toEqual(expectedReactie);
});

test('assignReactieToKot wijst een reactie toe aan een kot', async () => {
    const reactieId = 1;
    const kotId = 2;

    ReactieDb.assignReactieToKot = mockReactieDbAssignToKot.mockResolvedValue(true);

    const result = await ReactieService.assignReactieToKot(reactieId, kotId);

    expect(mockReactieDbAssignToKot).toHaveBeenCalledWith(reactieId, kotId);
    expect(result).toBe(true);
});

test('removeReactieFromKot verwijdert een reactie van een kot', async () => {
    const reactieId = 1;
    const kotId = 2;

    ReactieDb.removeReactieFromKot = mockReactieDbRemoveFromKot.mockResolvedValue(true);

    const result = await ReactieService.removeReactieFromKot(reactieId, kotId);

    expect(mockReactieDbRemoveFromKot).toHaveBeenCalledWith(reactieId, kotId);
    expect(result).toBe(true);
});

test('updateReactie werkt een reactie bij', async () => {
    const reactieId = 1;
    const updatedReactieInput = {
        reviewtekst: 'Gewijzigde ervaring!',
        score: 4,
        titel: 'Prima Kot',
    };

    ReactieDb.updateReactie = mockReactieDbUpdate.mockResolvedValue(true);

    const result = await ReactieService.updateReactie(reactieId, updatedReactieInput);

    expect(mockReactieDbUpdate).toHaveBeenCalledWith(reactieId, updatedReactieInput);
    expect(result).toBe(true);
});

test('removeReactie verwijdert een reactie', async () => {
    const reactieId = 1;

    ReactieDb.removeReactie = mockReactieDbRemove.mockResolvedValue(true);

    const result = await ReactieService.removeReactie(reactieId);

    expect(mockReactieDbRemove).toHaveBeenCalledWith(reactieId);
    expect(result).toBe(true);
});
