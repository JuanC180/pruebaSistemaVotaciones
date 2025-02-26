import express from 'express';
import {
  votersGet,
  votersPost,
  votersGetById,
  votersPut,
  votersDelete
} from '../controllers/votersControllers.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Voter:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the voter
 *         name:
 *           type: string
 *           description: The name of the voter
 *         email:
 *           type: string
 *           description: The email of the voter
 *         has_voted:
 *           type: boolean
 *           description: Indicates if the voter has voted
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john.doe@example.com
 *         has_voted: false
 *
 *   responses:
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Error interno del servidor
 *     VoterNotFound:
 *       description: Voter not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Votante no encontrado
 */

/**
 * @swagger
 * tags:
 *   name: Voters
 *   description: The Voters managing API
 */

/**
 * @swagger
 * /voters:
 *   get:
 *     summary: Returns the list of all voters
 *     tags: [Voters]
 *     responses:
 *       200:
 *         description: The list of voters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voter'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   post:
 *     summary: Create a new voter
 *     tags: [Voters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voter'
 *     responses:
 *       200:
 *         description: Created voter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voter'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /voters/{id}:
 *   get:
 *     summary: Get a voter by ID
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Voter ID
 *     responses:
 *       200:
 *         description: Voter details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voter'
 *       404:
 *         $ref: '#/components/responses/VoterNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     summary: Update a voter by ID
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Voter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voter'
 *     responses:
 *       200:
 *         description: Updated voter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voter'
 *       404:
 *         $ref: '#/components/responses/VoterNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete a voter by ID
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Voter ID
 *     responses:
 *       200:
 *         description: Voter deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Votante eliminado
 *       404:
 *         $ref: '#/components/responses/VoterNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get('/', votersGet);
router.get('/:id', votersGetById);
router.post('/', votersPost);
router.put('/:id', votersPut); // Descomentado para que funcione
router.delete('/:id', votersDelete);

export default router;
