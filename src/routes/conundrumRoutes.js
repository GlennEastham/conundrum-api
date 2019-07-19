'use strict'

module.exports = function (app) {
  var conundrum = require('../controllers/conundrumController.js')

  app.route('/conundrum')
    .get(conundrum.getRandomConundrum)
    /**
 * @swagger
 *
 * /conundrum:
 *   get:
 *     description: Get a conundrum
 *     produces:
 *          - application/json
 *     responses:
 *       200:
 *         description: A Conundrum Object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuidv4
 *                   example: 68a176b9-7360-48b3-b725-9a54b646c669
 *                 name:
 *                   word: string
 *                   example: rcnmndouu
 */
    .post(conundrum.getConundrum)
    /**
 * @swagger
 *
 * /conundrum:
 *   post:
 *     parameters:
 *        - in: body
 *          name: Conundrum
 *          description: The Conundrum to solve.
 *          schema:
 *            type: object
 *            required:
 *              - id
 *              - word
 *            properties:
 *              id:
 *                 type: string
 *                 format: uuidv4
 *                 example: 68a176b9-7360-48b3-b725-9a54b646c669
 *              word:
 *                 word: string
 *                 example: conundrum
 *     produces:
 *          - application/json
 *     responses:
 *       200:
 *         description: Returns a bool value of the solved conundrum
 */
}
