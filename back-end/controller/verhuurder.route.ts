/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   Verhuurder:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         format: int64
 *       name:
 *         type: string
 *       email:
 *         type: string
 */

import express, { Request, Response } from 'express';
import { VerhuurderInput } from '../types';
import verhuurderService from '../service/Verhuurder.service';

const verhuurderRouter = express.Router();

/**
 * @swagger
 * /verhuurders:
 *   post:
 *     summary: Create a new Verhuurder
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verhuurder'
 *     responses:
 *       200:
 *         description: Verhuurder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Verhuurder'
 *       400:
 *         description: Error creating Verhuurder
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */

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

/**
 * @swagger
 * /verhuurders:
 *   get:
 *     summary: Get a list of Verhuurders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Verhuurders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Verhuurder'
 *       400:
 *         description: Error retrieving Verhuurders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */

verhuurderRouter.get('/', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const result = verhuurderService.getVerhuurders();
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

/**
 * @swagger
 * /verhuurders/{id}:
 *   get:
 *     summary: Get a Verhuurder by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Verhuurder to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Verhuurder retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Verhuurder'
 *       400:
 *         description: Error retrieving Verhuurder
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */

verhuurderRouter.get('/:id', (req: Request, res: Response) => {
    //GET REQUEST IMPLEMENTEREN
    try {
        const verhuurder = verhuurderService.getVerhuurderById(Number(req.params.id));
        res.status(200).json(verhuurder); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});


export { verhuurderRouter };
