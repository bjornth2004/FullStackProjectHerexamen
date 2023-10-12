import KotDataAccess from '../domain/data-access/Kot.db';
import { Kot } from '../domain/model/Kot';

class KotService {
    private dataAccess: KotDataAccess;

    constructor() {
        this.dataAccess = new KotDataAccess();
    }

    addKot(kot: Kot): void {
        this.dataAccess.addKot(kot);
    }

    getKotById(id: number): Kot | undefined {
        return this.dataAccess.getKotById(id);
    }

    getAllKots(): Kot[] {
        return this.dataAccess.getAllKots();
    }

    updateKot(updatedKot: Kot): void {
        this.dataAccess.updateKot(updatedKot);
    }

    deleteKotById(id: number): void {
        this.dataAccess.deleteKotById(id);
    }
}

export default KotService;
