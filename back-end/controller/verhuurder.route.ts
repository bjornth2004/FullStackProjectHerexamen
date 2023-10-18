import express, { Request, Response } from 'express';
import { VerhuurderInput } from '../types';
import verhuurderService from '../service/Verhuurder.service';

const verhuurderRouter = express.Router();

verhuurderRouter.post('/', (req: Request, res: Response) => {
    try {
        //Try catch
        const verhuurder = <VerhuurderInput>req.body;
        const result = verhuurderService.createVerhuurder(verhuurder);
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

export { verhuurderRouter };
