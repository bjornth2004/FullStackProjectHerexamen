import express, { Request, Response } from 'express';
import { HuurderInput } from '../types';
import { HuurderService } from '../service/huurder.service';

const huurderRouter = express.Router();

huurderRouter.post('/', (req: Request, res: Response) => {
    try {
        const huurder = <HuurderInput>req.body;
        const result = HuurderService.createHuurder;
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { huurderRouter };
