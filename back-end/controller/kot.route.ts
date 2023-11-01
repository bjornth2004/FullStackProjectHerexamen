/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   Kot:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         format: int64
 *       name:
 *         type: string
 *       location:
 *         type: string
 *       price:
 *         type: number
 */

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

kotRouter.get('/', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const result = kotService.getKoten();
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

kotRouter.get('/:huurderId/:verhuurderId', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const huurderId = Number(req.params.huurderId);
        const verhuurderId = Number(req.params.verhuurderId);
        const kot = kotService.getKotByHuurderVerhuurderId({huurderId,verhuurderId});
        res.status(200).json(); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

export { kotRouter };
