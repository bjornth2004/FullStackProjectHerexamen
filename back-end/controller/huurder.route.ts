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

/**
 * @swagger
 * /huurders:
 *   post:
 *     summary: Create a new Huurder
 *     tags: [Huurder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Huurder'
 *     responses:
 *       200:
 *         description: Created Huurder
 *       400:
 *         description: Bad Request
 */
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

/**
 * @swagger
 * /huurders:
 *   get:
 *     summary: Get a list of all Huurders
 *     tags: [Huurder]
 *     responses:
 *       200:
 *         description: A list of Huurders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Huurder'
 *       400:
 *         description: Bad Request
 */

huurderRouter.get('/', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const result = huurderService.getHuurders();
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

/**
 * @swagger
 * /huurders/{id}:
 *   get:
 *     summary: Get a Huurder by ID
 *     tags: [Huurder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           format: int64
 *         description: ID of the Huurder to get
 *     responses:
 *       200:
 *         description: A Huurder
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Huurder'
 *       400:
 *         description: Bad Request
 */

huurderRouter.get('/:id', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const huurder = huurderService.getHuurderById(Number(req.params.id));
        res.status(200).json(huurder); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

export { huurderRouter };
