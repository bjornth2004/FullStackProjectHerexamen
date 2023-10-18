import express, { Request, Response } from 'express';
import { KotInput } from '../types';
import kotService from '../service/Kot.service';

const kotRouter = express.Router();

kotRouter.post('/', (req: Request, res: Response) => {
    try {
        //Try catch
        const kot = <KotInput>req.body;
        const result = kotService.createKot(kot);
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

export { kotRouter };
