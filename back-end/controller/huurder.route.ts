/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *     Huurder:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         naam:
 *           type: string
 *         voorNaam:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         straat:
 *           type: string
 *         postcode:
 *           type: string
 *         telefoon:
 *           type: string
 */

import express, { Request, Response } from 'express';
import { HuurderInput } from '../types';
import huurderService from '../service/Huurder.service';

const huurderRouter = express.Router();

huurderRouter.post('/', (req: Request, res: Response) => {
    //POST REQUEST IMPLEMENTEREN
    try {
        //Try catch
        const huurder = <HuurderInput>req.body;
        const result = huurderService.createHuurder(huurder);
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

huurderRouter.get('/', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const result = huurderService.getHuurders();
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

export { huurderRouter };
