import express from 'express';

import {
  candidatesGet,
  candidatesGetById,
  candidatesPost,
  candidatesDelete,
} from '../controllers/candidatesControllers.js';

const router = express.Router();

// Swagger Documentation
/**
 * @swagger
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the candidate.
 *         name:
 *           type: string
 *           description: The name of the candidate.
 *         party:
 *           type: string
 *           description: The political party of the candidate.
 *         votes:
 *           type: integer
 *           description: The number of votes the candidate has received.
 *       example:
 *         id: 1
 *         name: "Luis Pérez"
 *         party: "Partido A"
 *         votes: 1000
 */

/**
 * @swagger
 * tags:
 *   - name: Candidates
 *     description: API for managing candidates.
 */

// Rutas para Candidatos
// Ruta GET para obtener todos los candidatos
/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Retrieves a list of all candidates.
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: A list of candidates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *       500:
 *         description: Internal server error.
 */
router.get('/', candidatesGet);


/**
 * @swagger
 * /candidates/{id}:
 *   get:
 *     summary: Retrieves a candidate by ID.
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the candidate.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The candidate object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: Candidate not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', candidatesGetById);


/**
 * @swagger
 * /candidates:
 *   post:
 *     summary: Creates a new candidate.
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: The created candidate object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       500:
 *         description: Internal server error.
 */
router.post('/', candidatesPost);


/**
 * @swagger
 * /candidates/{id}:
 *   delete:
 *     summary: Deletes a candidate by ID.
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the candidate to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidate deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Candidato Eliminado"
 *       404:
 *         description: Candidate not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', candidatesDelete);

export default router;
