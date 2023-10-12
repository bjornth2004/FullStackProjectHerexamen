import express, {Request, Response} from 'express';
import huurderService from '../service/huurder.service';
import {HuurderInput} from '../types';

const huurderRouter = express.Router();

huurderRouter.post('/', (req: Request, res: Response) => {
    try {
        const huurder = <HuurderInput>req.body;
        const result = huurderService.createHuurder;
    } catch (error) {
        res.status(400).json({status:"error",errorMessage: error.message});
    }
});

export {huurderRouter}