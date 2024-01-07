/**
 * @swagger
 * components:
 *   schemas:
 *     Reactie:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         reviewtekst:
 *           type: string
 *         score:
 *           type: number
 *           format: float
 *         titel:
 *           type: string
 *     ReactieInput:
 *       type: object
 *       properties:
 *         reviewtekst:
 *           type: string
 *         score:
 *           type: number
 *           format: float
 *         titel:
 *           type: string
 */

import express, { Request, Response } from 'express';
import { ReactieInput } from '../types';
import reactieService from '../service/Reactie.service';

const reactieRouter = express.Router();

/**
 * @swagger
 * paths:
 *   /reacties:
 *     post:
 *       summary: Create a new Reactie
 *       tags:
 *         - Reactie
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReactieInput'
 *       responses:
 *         '200':
 *           description: Successfully created Reactie
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.post('/', async (req: Request, res: Response) => {
    //async niet vergeten alsge werkt met de database
    try {
        const reactie = <ReactieInput>req.body;
        const result = await reactieService.createReactie(reactie); //await ook niet vergeten
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /reacties:
 *     get:
 *       summary: Get all Reacties
 *       tags:
 *         - Reactie
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of Reacties
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await reactieService.getReacties();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /reacties/{id}:
 *     get:
 *       summary: Get a Reactie by ID
 *       tags:
 *         - Reactie
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Reactie
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully retrieved Reactie by ID
 *         '404':
 *           description: Reactie not found
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const reactie = await reactieService.getReactieById(Number(req.params.id));
        res.status(200).json(reactie);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /reacties/toewijzen/{reactieId}/{kotId}:
 *     post:
 *       summary: Assign Reactie to Kot
 *       tags:
 *         - Reactie
 *       parameters:
 *         - in: path
 *           name: reactieId
 *           required: true
 *           description: ID of the Reactie
 *           schema:
 *             type: number
 *             format: int64
 *         - in: path
 *           name: kotId
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully assigned Reactie to Kot
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.post('/toewijzen/:reactieId/:kotId', async (req: Request, res: Response) => {
    try {
        const reactieId = Number(req.params.reactieId);
        const kotId = Number(req.params.kotId);
        const result = await reactieService.assignReactieToKot(reactieId, kotId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /reacties/ontkoppelen/{reactieId}/{kotId}:
 *     delete:
 *       summary: Remove Reactie from Kot
 *       tags:
 *         - Reactie
 *       parameters:
 *         - in: path
 *           name: reactieId
 *           required: true
 *           description: ID of the Reactie
 *           schema:
 *             type: number
 *             format: int64
 *         - in: path
 *           name: kotId
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully removed Reactie from Kot
 *         '404':
 *           description: Reactie not found or not associated
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.delete('/ontkoppelen/:reactieId/:kotId', async (req: Request, res: Response) => {
    try {
        const reactieId = Number(req.params.reactieId);
        const kotId = Number(req.params.kotId);
        await reactieService.removeReactieFromKot(reactieId, kotId);
        res.status(200).json({
            status: 'success',
            message: 'Reactie successfully disassociated from kot.',
        });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /reacties/{reactieId}:
 *     delete:
 *       summary: Remove Reactie
 *       tags:
 *         - Reactie
 *       parameters:
 *         - in: path
 *           name: reactieId
 *           required: true
 *           description: ID of the Reactie
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully removed Reactie
 *         '404':
 *           description: Reactie not found
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.delete('/:reactieId', async (req: Request, res: Response) => {
    try {
        const reactieId = Number(req.params.reactieId);
        await reactieService.removeReactie(reactieId);
        res.status(200).json({ status: 'success', message: 'Reactie successfully removed.' });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /reacties/{reactieId}:
 *     put:
 *       summary: Update Reactie
 *       tags:
 *         - Reactie
 *       parameters:
 *         - in: path
 *           name: reactieId
 *           required: true
 *           description: ID of the Reactie
 *           schema:
 *             type: number
 *             format: int64
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReactieInput'
 *       responses:
 *         '200':
 *           description: Successfully updated Reactie
 *         '404':
 *           description: Reactie not found
 *         '400':
 *           description: Bad request or validation error
 */

reactieRouter.put('/:reactieId', async (req: Request, res: Response) => {
    try {
        const reactieId = Number(req.params.reactieId);
        const updatedReactie = req.body as ReactieInput;
        const result = await reactieService.updateReactie(reactieId, updatedReactie);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { reactieRouter };
