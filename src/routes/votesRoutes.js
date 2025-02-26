

// routes/votesRoutes.js

import express from 'express';
import {
  votesGet,
  votesPost,
  votesStatitisGet,
} from '../controllers/votesControllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Votes
 *     description: API endpoints for managing votes.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - voter_id
 *         - candidate_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the vote.
 *         voter_id:
 *           type: integer
 *           description: The ID of the voter.
 *         candidate_id:
 *           type: integer
 *           description: The ID of the candidate.
 *       example:
 *         id: 1
 *         voter_id: 1
 *         candidate_id: 2
 *     VoteStatistics:
 *       type: object
 *       properties:
 *         totalVoters:
 *           type: integer
 *           description: The total number of voters who have voted.
 *         results:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the candidate.
 *               name:
 *                 type: string
 *                 description: The name of the candidate.
 *               votes:
 *                 type: integer
 *                 description: The number of votes the candidate received.
 *               percentage:
 *                 type: number
 *                 description: The percentage of votes the candidate received.
 *           example:
 *             - id: 1
 *               name: Candidate A
 *               votes: 60
 *               percentage: 60.00
 *             - id: 2
 *               name: Candidate B
 *               votes: 40
 *               percentage: 40.00
 */

/**
 * @swagger
 * /votes:
 *   get:
 *     summary: Retrieve a list of all votes.
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: A list of votes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 *       500:
 *         description: Internal server error.
 */
router.get('/', votesGet);

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Create a new vote.
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vote'
 *     responses:
 *       201:
 *         description: Vote created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Voter or candidate not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/', votesPost);

/**
 * @swagger
 * /votes/statistics:
 *   get:
 *     summary: Retrieve vote statistics.
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: Vote statistics.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoteStatistics'
 *       500:
 *         description: Internal server error.
 */
router.get('/statistics', votesStatitisGet);

export default router;
