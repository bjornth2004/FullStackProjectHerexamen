
import { Huurder } from '../model/Huurder';

class HuurderDataAccess {
  private huurders: Huurder[] = [];

  constructor() {
    // hier is data denk ik
  }

  addHuurder(huurder: Huurder): void {
    this.huurders.push(huurder);
  }

  getHuurderById(id: number): Huurder | undefined {
    return this.huurders.find((huurder) => huurder.id === id);
  }

  getAllHuurders(): Huurder[] {
    return this.huurders;
  }

  updateHuurder(updatedHuurder: Huurder): void {
    const index = this.huurders.findIndex((huurder) => huurder.id === updatedHuurder.id);

    if (index !== -1) {
      this.huurders[index] = updatedHuurder;
    }
  }

  deleteHuurderById(id: number): void {
    this.huurders = this.huurders.filter((huurder) => huurder.id !== id);
  }
}

export default HuurderDataAccess;
