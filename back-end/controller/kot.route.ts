/**
 * @swagger
 * components:
 *   schemas:
 *     Kot:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         actief:
 *           type: boolean
 *         oppervlakte:
 *           type: number
 *         locatie:
 *           type: string
 *         verhuurprijs:
 *           type: number
 *         verhuurderId:
 *           type: number
 *     KotInput:
 *       type: object
 *       properties:
 *         actief:
 *           type: boolean
 *         oppervlakte:
 *           type: number
 *         locatie:
 *           type: string
 *         verhuurprijs:
 *           type: number
 */

import express, { Request, Response } from 'express';
import { KotInput } from '../types';
import kotService from '../service/Kot.service';

const kotRouter = express.Router();

/**
 * @swagger
 * paths:
 *   /koten:
 *     post:
 *       summary: Create a new Kot
 *       tags:
 *         - Kot
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KotInput'
 *       responses:
 *         '200':
 *           description: Successfully created Kot
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.post('/', async (req: Request, res: Response) => {
    try {
        //Try catch
        const kot = <KotInput>req.body;
        const result = await kotService.createKot(kot);
        res.status(200).json(result); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

/**
 * @swagger
 * paths:
 *   /koten:
 *     get:
 *       summary: Get all Kots
 *       tags:
 *         - Kot
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of Kots
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.get('/', async (req: Request & { auth: any }, res: Response) => {
    //, next: NextFunction
    try {
        const { email, role } = req.auth;

        const result = await kotService.getKoten({ email, role });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
        //next(error); // Gebruik de next-functie voor error handling.
    }
});

/**
 * @swagger
 * paths:
 *   /koten/{id}:
 *     get:
 *       summary: Get a Kot by ID
 *       tags:
 *         - Kot
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully retrieved Kot by ID
 *         '404':
 *           description: Kot not found
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const kot = await kotService.getKotById(Number(req.params.id));
        if (kot) {
            res.status(200).json(kot);
        } else {
            res.status(404).json({ status: 'error', errorMessage: 'Kot not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /koten/huurder_aanpassen/{kotId}/{huurderId}:
 *     put:
 *       summary: Assign Huurder to Kot
 *       tags:
 *         - Kot
 *       parameters:
 *         - in: path
 *           name: kotId
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *         - in: path
 *           name: huurderId
 *           required: true
 *           description: ID of the Huurder
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully assigned Huurder to Kot
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.put('/huurder_aanpassen/:kotId/:huurderId', async (req: Request, res: Response) => {
    try {
        const kotId = Number(req.params.kotId);
        const huurderId = Number(req.params.huurderId);
        // oproepen van service functie om huurder en kot te verbinden
        const result = await kotService.assignHuurderToKot(kotId, huurderId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /koten/verhuurder_aanpassen/{kotId}/{verhuurderId}:
 *     put:
 *       summary: Assign Verhuurder to Kot
 *       tags:
 *         - Kot
 *       parameters:
 *         - in: path
 *           name: kotId
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *         - in: path
 *           name: verhuurderId
 *           required: true
 *           description: ID of the Verhuurder
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully assigned Verhuurder to Kot
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.put('/verhuurder_aanpassen/:kotId/:verhuurderId', async (req: Request, res: Response) => {
    try {
        const kotId = Number(req.params.kotId);
        const verhuurderId = Number(req.params.verhuurderId);
        const result = await kotService.assignVerhuurderToKot(kotId, verhuurderId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /koten/{id}:
 *     put:
 *       summary: Update a Kot by ID
 *       tags:
 *         - Kot
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KotInput'
 *       responses:
 *         '200':
 *           description: Successfully updated Kot
 *         '404':
 *           description: Kot not found
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const kotId = Number(req.params.id);
        const updatedKot = req.body as KotInput;
        const result = await kotService.updateKot(kotId, updatedKot);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /koten/{id}:
 *     delete:
 *       summary: Delete a Kot by ID
 *       tags:
 *         - Kot
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Kot
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully deleted Kot
 *         '404':
 *           description: Kot not found
 *         '400':
 *           description: Bad request or validation error
 */

kotRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const kotId = Number(req.params.id);
        await kotService.deleteKot(kotId);
        res.status(200).json({ status: 'success', message: 'Kot deleted successfully.' });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { kotRouter };
