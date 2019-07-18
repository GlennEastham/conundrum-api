'use strict';

/**
 * @swagger
 * /conundrum:
 *    get:
 *      description: This should return all users
 */

module.exports = function (app) {
    var conundrum = require('../controllers/conundrumController.js');

    app.route('/conundrum')
        .get(conundrum.getConundrum)
        .post(conundrum.solveConundrum);

};
