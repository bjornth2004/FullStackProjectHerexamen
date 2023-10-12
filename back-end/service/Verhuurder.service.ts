import VerhuurderDataAccess from '../domain/data-access/Verhuurder.db';
import { Verhuurder } from '../domain/model/Verhuurder';

class VerhuurderService {
    private dataAccess: VerhuurderDataAccess;

    constructor() {
        this.dataAccess = new VerhuurderDataAccess();
    }

    addVerhuurder(verhuurder: Verhuurder): void {
        this.dataAccess.addVerhuurder(verhuurder);
    }

    getVerhuurderById(id: number): Verhuurder | undefined {
        return this.dataAccess.getVerhuurderById(id);
    }

    getAllVerhuurders(): Verhuurder[] {
        return this.dataAccess.getAllVerhuurders();
    }

    updateVerhuurder(updatedVerhuurder: Verhuurder): void {
        this.dataAccess.updateVerhuurder(updatedVerhuurder);
    }

    deleteVerhuurderById(id: number): void {
        this.dataAccess.deleteVerhuurderById(id);
    }
}

export default VerhuurderService;
