
const express = require('express')
const login = require('../models/Login')
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       properties:
 *          email: 
 *            type: string
 *            description: Url for the house
 *          password: 
 *            type: string
 *            description: Name of the property
 *       example:
 *               
 */

/**
  * @swagger
  * tags:
  *   name: Login
  *   description: The Airbnb property Login managing API
  */

/**
 * @swagger
 * /login:
 *    get:
 *      summary: Returns a whole list of the airbnb Users
 *      tags: [Login]
 *      responses:
 *        200:
 *          description: The list of properies
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/List'
 * 
 */
router.get('/', async (req, res) => {
    try {
        const listsRes = await login.find().limit(10)
        res.send(listsRes)
        res.json(listsRes)

    } catch (err) {
        console.log(err)
    }
})