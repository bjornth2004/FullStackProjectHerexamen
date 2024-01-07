/**
 * @swagger
 * components:
 *   schemas:
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
 *     HuurderInput:
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
 * paths:
 *   /huurders:
 *     post:
 *       summary: Create a new Huurder
 *       tags:
 *         - Huurder
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HuurderInput'
 *       responses:
 *         '200':
 *           description: Successfully created Huurder
 *         '400':
 *           description: Bad request or validation error
 */

//huurder posten
huurderRouter.post('/', async (req: Request, res: Response) => {
    try {
        //Try catch
        const huurder = <HuurderInput>req.body;
        const result = await huurderService.createHuurder(huurder);
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

/**
 * @swagger
 * paths:
 *   /huurders:
 *     get:
 *       summary: Get all Huurders
 *       tags:
 *         - Huurder
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of Huurders
 *         '400':
 *           description: Bad request or validation error
 */

//Get all huurders
huurderRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await huurderService.getHuurders();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /huurders/{id}:
 *     get:
 *       summary: Get a Huurder by ID
 *       tags:
 *         - Huurder
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Huurder
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully retrieved Huurder by ID
 *         '400':
 *           description: Bad request or validation error
 */

//huurder bij ID krijgen
huurderRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const huurder = await huurderService.getHuurderById(Number(req.params.id));
        res.status(200).json(huurder);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /huurders/delete/{id}:
 *     delete:
 *       summary: Delete a Huurder by ID
 *       tags:
 *         - Huurder
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Huurder
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully deleted Huurder
 *         '404':
 *           description: Huurder not found
 *         '400':
 *           description: Bad request or validation error
 */

//huurder deleten
huurderRouter.delete('/delete/:id', async (req, res) => {
    console.log('Attempting to delete Huurder with ID:', req.params.id);

    try {
        // Zet req.params.id om van string naar number anders krijg ik een error van da hem een number verwacht en geen string
        const huurderId = Number(req.params.id);

        const deletedHuurder = await huurderService.deleteHuurderById(huurderId);

        if (deletedHuurder) {
            res.status(200).json({ status: 'success', message: 'Huurder successfully deleted' });
        } else {
            res.status(404).json({ status: 'error', errorMessage: 'Huurder not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /huurders/update/{id}:
 *     put:
 *       summary: Update a Huurder by ID
 *       tags:
 *         - Huurder
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Huurder
 *           schema:
 *             type: number
 *             format: int64
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HuurderInput'
 *       responses:
 *         '200':
 *           description: Successfully updated Huurder
 *         '404':
 *           description: Huurder not found
 *         '400':
 *           description: Bad request or validation error
 */

//huurder updaten
huurderRouter.put('/update/:id', async (req, res) => {
    console.log('Attempting to update Huurder with ID:', req.params.id);

    try {
        const huurderId = Number(req.params.id);
        const updatedHuurder = await huurderService.updateHuurder(huurderId, req.body);

        if (updatedHuurder) {
            // Als succesvol geupdate is
            res.status(200).json(updatedHuurder);
        } else {
            res.status(404).json({ status: 'error', errorMessage: 'Huurder not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export { huurderRouter };
