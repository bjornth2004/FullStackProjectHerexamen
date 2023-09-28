import { Kot } from '../model/Kot';

class KotDataAccess {
    private kot: Kot[] = [];

    constructor() {
        // hier is data denk ik
    }

    addKot(kot: Kot): void {
        this.kot.push(kot);
    }

    getKotById(id: number): Kot | undefined {
        return this.kot.find((kot) => kot.id === id);
    }

    getAllKots(): Kot[] {
        return this.kot;
    }

    updateKot(updatedKot: Kot): void {
        const index = this.kot.findIndex((kot) => kot.id === updatedKot.id);

        if (index !== -1) {
            this.kot[index] = updatedKot;
        }
    }

    deleteKotById(id: number): void {
        this.kot = this.kot.filter((kot) => kot.id !== id);
    }
}

export default KotDataAccess;