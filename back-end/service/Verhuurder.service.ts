import VerhuurderDb from '../domain/data-access/Verhuurder.db';
import { AuthenticationResponse, Role, VerhuurderInput } from '../types';
import * as bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const createVerhuurder = async (verhuurderInput: VerhuurderInput) => {
    const existing = await VerhuurderDb.getVerhuurderById(verhuurderInput.id);
    if (existing) {
        throw new Error(`Verhuurder with id ${verhuurderInput.id} is already registered.`);
    }
    //gebruiken van bcrypt om password te encrypten
    const hashedPassword = await bcrypt.hash(verhuurderInput.password, 12); //12 is een goeie waarde

    // Tussenstap om password naar hashedPassword om te zetten
    const newVerhuurderData = {
        ...verhuurderInput,
        password: hashedPassword, // Gebruik het gehashte wachtwoord
    };
    return await VerhuurderDb.createVerhuurder(newVerhuurderData);
};

const getVerhuurderByEmail = async (email: string) => {
    return await VerhuurderDb.getVerhuurderByEmail(email);
};

// Authenticate functie voor verhuurder
const authenticate = async ({
    email,
    password,
}: VerhuurderInput): Promise<AuthenticationResponse> => {
    console.log(email);
    const verhuurder = await getVerhuurderByEmail(email);

    if (!verhuurder) {
        throw new Error('Verhuurder not found with provided email.'); //checken of er wel een verhuurder is met die mail
    }

    const isValidPassword = await bcrypt.compare(password, verhuurder.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    // Zet role om naar het Role type na het controleren van de verhuurder en het wachtwoord
    const role: Role = verhuurder.role as Role;

    return {
        token: generateJwtToken({ email, role }), // role toevoegen
        email,
        fullname: `${verhuurder.naam} ${verhuurder.achternaam}`,
    };
};

const getVerhuurders = async () => {
    return await VerhuurderDb.getAllVerhuurders();
};

const getVerhuurderById = async (id: number) => {
    return await VerhuurderDb.getVerhuurderById(id);
};

const deleteVerhuurder = async (id: number) => {
    return await VerhuurderDb.deleteVerhuurder(id);
};

const updateVerhuurder = async (id: number, verhuurderInput: VerhuurderInput) => {
    return await VerhuurderDb.updateVerhuurder(id, verhuurderInput);
};

export default {
    createVerhuurder,
    getVerhuurders,
    getVerhuurderById,
    deleteVerhuurder,
    updateVerhuurder,
    authenticate,
    getVerhuurderByEmail,
};
