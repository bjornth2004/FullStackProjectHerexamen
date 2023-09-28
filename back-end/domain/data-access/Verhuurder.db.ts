import { Verhuurder } from '../model/Verhuurder';

class VerhuurderDataAccess {
    private verhuurder: Verhuurder[] = [];

    constructor() {
        // hier is data denk ik
    }

    addVerhuurder(verhuurder: Verhuurder): void {
        this.verhuurder.push(verhuurder);
    }

    getVerhuurderById(id: number): Verhuurder | undefined {
        return this.verhuurder.find((verhuurder) => verhuurder.id === id);
    }

    getAllVerhuurders(): Verhuurder[] {
        return this.verhuurder;
    }

    updateVerhuurder(updatedVerhuurder: Verhuurder): void {
        const index = this.verhuurder.findIndex(
            (verhuurder) => verhuurder.id === updatedVerhuurder.id
        );

        if (index !== -1) {
            this.verhuurder[index] = updatedVerhuurder;
        }
    }

    deleteVerhuurderById(id: number): void {
        this.verhuurder = this.verhuurder.filter((verhuurder) => verhuurder.id !== id);
    }
}

export default VerhuurderDataAccess;