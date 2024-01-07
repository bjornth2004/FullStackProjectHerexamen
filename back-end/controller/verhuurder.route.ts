/**
 * @swagger
 * components:
 *   schemas:
 *     Verhuurder:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         naam:
 *           type: string
 *         achternaam:
 *           type: string
 *         pass:
 *           type: string
 *         iban:
 *           type: string
 *         tel:
 *           type: string
 *         email:
 *           type: string
 *     VerhuurderInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         naam:
 *           type: string
 *         achternaam:
 *           type: string
 *         pass:
 *           type: string
 *         iban:
 *           type: string
 *         tel:
 *           type: string
 *         email:
 *           type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import { VerhuurderInput } from '../types';
import verhuurderService from '../service/Verhuurder.service';

const verhuurderRouter = express.Router();

/**
 * @swagger
 * /verhuurders:
 *   post:
 *     summary: Registreert een nieuwe verhuurder.
 *     description: Voegt een nieuwe verhuurder toe aan de database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerhuurderInput'
 *     responses:
 *       200:
 *         description: De verhuurder is succesvol geregistreerd.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Verhuurder'
 *       400:
 *         description: Er is een fout opgetreden bij het registreren van de verhuurder.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *     tags:
 *       - Verhuurder
 */

verhuurderRouter.post('/', async (req: Request, res: Response) => {
    //async toegevoegd
    try {
        //Try catch
        const verhuurder = <VerhuurderInput>req.body;
        const result = await verhuurderService.createVerhuurder(verhuurder); //await toegevoegd
        res.status(200).json(result);
    } catch (error) {
        //next(error); //ipv error 400 next(error) --> geeft inifinite loop
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /verhuurders/login:
 *   post:
 *     summary: Logt een verhuurder in en retourneert een JWT-token
 *     tags: [Verhuurders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email van de verhuurder voor login.
 *               password:
 *                 type: string
 *                 description: Wachtwoord van de verhuurder voor login.
 *             example:
 *               email: verhuurder@example.com
 *               password: wachtwoord123
 *     responses:
 *       200:
 *         description: Authenticatie succesvol, JWT-token geretourneerd.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticatie succesvol
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 verhuurderId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Ongeldige input, object met foutmelding geretourneerd.
 *       401:
 *         description: Ongeautoriseerd, verkeerde email of wachtwoord.
 */

verhuurderRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body); //checken of password en email goed worden ingelezen
        const verhuurderInput = <VerhuurderInput>req.body;
        const response = await verhuurderService.authenticate(verhuurderInput);
        res.status(200).json({ message: 'Authenticatie succesvol', ...response });
    } catch (error) {
        next(error);
        console.log(error); //weergeven in terminal wat de error is
    }
});

/**
 * @swagger
 * paths:
 *   /verhuurders:
 *     get:
 *       summary: Get all Verhuurders
 *       tags:
 *         - Verhuurder
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of Verhuurders
 *         '400':
 *           description: Bad request or validation error
 */

verhuurderRouter.get('/', async (req: Request, res: Response) => {
    //async toegevoegd
    try {
        const result = await verhuurderService.getVerhuurders(); //await toegevoegd
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /verhuurders/{id}:
 *     get:
 *       summary: Get a Verhuurder by ID
 *       tags:
 *         - Verhuurder
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Verhuurder
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully retrieved Verhuurder by ID
 *         '404':
 *           description: Verhuurder not found
 *         '400':
 *           description: Bad request or validation error
 */

verhuurderRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const verhuurder = await verhuurderService.getVerhuurderById(Number(req.params.id));
        res.status(200).json(verhuurder); //Als het goed gaat
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); //Als het fout gaat
    }
});

/**
 * @swagger
 * paths:
 *   /verhuurders/{id}:
 *     put:
 *       summary: Update Verhuurder
 *       tags:
 *         - Verhuurder
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Verhuurder
 *           schema:
 *             type: number
 *             format: int64
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerhuurderInput'
 *       responses:
 *         '200':
 *           description: Successfully updated Verhuurder
 *         '404':
 *           description: Verhuurder not found
 *         '400':
 *           description: Bad request or validation error
 */

verhuurderRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const verhuurderId = Number(req.params.id);
        const updatedVerhuurder: VerhuurderInput = req.body; // Gebruik directe toewijzing met type
        const result = await verhuurderService.updateVerhuurder(verhuurderId, updatedVerhuurder);
        res.status(200).json(result); // Als succesvol
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message }); // Voeg foutbericht toe
    }
});

/**
 * @swagger
 * paths:
 *   /verhuurders/{id}:
 *     delete:
 *       summary: Delete Verhuurder
 *       tags:
 *         - Verhuurder
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the Verhuurder
 *           schema:
 *             type: number
 *             format: int64
 *       responses:
 *         '200':
 *           description: Successfully deleted Verhuurder
 *         '404':
 *           description: Verhuurder not found
 *         '400':
 *           description: Bad request or validation error
 */

verhuurderRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const verhuurderId = Number(req.params.id);
        await verhuurderService.deleteVerhuurder(verhuurderId);
        res.status(200).json({ status: 'success', message: 'Verhuurder succesvol verwijderd.' });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { verhuurderRouter };
