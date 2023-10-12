import HuurderDataAccess from '../domain/data-access/Huurder.db';
import { Huurder } from '../domain/model/Huurder';

export class HuurderService {
    private dataAccess: HuurderDataAccess;

    constructor() {
        this.dataAccess = new HuurderDataAccess();
    }

    addHuurder(huurder: Huurder): void {
        this.dataAccess.addHuurder(huurder);
    }

    getHuurderById(id: number): Huurder | undefined {
        return this.dataAccess.getHuurderById(id);
    }

    getAllHuurders(): Huurder[] {
        return this.dataAccess.getAllHuurders();
    }

    updateHuurder(updatedHuurder: Huurder): void {
        const existingHuurder = this.dataAccess.getHuurderById(updatedHuurder.id);
        if (!existingHuurder) {
            throw new Error('Huurder not found');
        }
        this.dataAccess.updateHuurder(updatedHuurder);
    }

    deleteHuurderById(id: number): void {
        const existingHuurder = this.dataAccess.getHuurderById(id);
        if (!existingHuurder) {
            throw new Error('Huurder not found');
        }
        this.dataAccess.deleteHuurderById(id);
    }
}
