import { Reactie as ReactiePrisma } from '@prisma/client';

export class Reactie {
    readonly id: number;
    readonly reviewtekst: string;
    readonly score: number;
    readonly titel: string;

    constructor(reactie: { id: number; reviewtekst: string; score: number; titel: string }) {
        this.id = reactie.id;
        this.reviewtekst = reactie.reviewtekst;
        this.score = reactie.score;
        this.titel = reactie.titel;
    }

    static from(reactiePrisma: ReactiePrisma): Reactie {
        return new Reactie({
            id: reactiePrisma.id,
            reviewtekst: reactiePrisma.reviewtekst,
            score: reactiePrisma.score,
            titel: reactiePrisma.titel,
        });
    }

    equals({ id, reviewtekst, score, titel }): boolean {
        return (
            this.id == id &&
            this.reviewtekst == reviewtekst &&
            this.score == score &&
            this.titel == titel
        );
    }
}
