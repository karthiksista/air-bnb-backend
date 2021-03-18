const express = require('express')
const list = require('../models/Lists')
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       properties:
 *          _id: 
 *            type: string
 *            description: Unique Id 
 *          listing_url: 
 *            type: string
 *            description: Url for the house
 *          name: 
 *            type: string
 *            description: Name of the property
 *          summary: 
 *            type: string
 *            description: A brief Summary
 *          space: 
 *            type: string
 *            description: Area Details
 *          description: 
 *            type: string
 *            description: Description of the property
 *          neighborhood_overview: 
 *            type: string
 *            description: Details of the neighnborhood
 *          notes: 
 *            type: string
 *            description: Notes
 *          transit: 
 *            type:  string
 *            description: Transit Details
 *          access: 
 *            type: string
 *            description: Access Details
 *          interaction: 
 *            type: string
 *            description: Interaction Details
 *          house_rules: 
 *            type: string
 *            description: Rules by the oowner
 *          property_type: 
 *            type: string
 *            description: Total cost of the prop
 *          room_type: 
 *            type: string
 *            description: Types of rooms
 *          bed_type: 
 *            type: string
 *            description: Types of bed
 *          minimum_nights: 
 *            type: string
 *            description: Valid stay of nights
 *          maximum_nights: 
 *            type: string
 *            description: Valid stay of nights max
 *          cancellation_policy: 
 *            type: string
 *            description: pilicy for cancellation
 *          last_scraped: 
 *            type: date
 *            description: last scraped date
 *          first_review: 
 *            type: date
 *            description: Date of first review
 *          last_review: 
 *            type: string
 *            description: Date of last review
 *          accommodates: 
 *            type: number
 *            description: No of acoomodates
 *          bedrooms:
 *            type: number
 *            description: No of bedrooms
 *          beds:
 *            type: number
 *            description: No of beds
 *          number_of_reviews:
 *            type: number
 *            description: No of reviews
 *          bathrooms:
 *            type: number
 *            description: No of bathrooms
 *          amenities: 
 *            type: array
 *            description: No of amenities
 *          price:
 *            type: Number
 *            description: Price
 *          weekly_price:
 *            type: Number
 *            description: Weekly price
 *          monthly_price:
 *            type: Number
 *            description: Monthly price
 *          security_deposit:
 *            type: Number
 *            description: Deposits
 *          cleaning_fee:
 *            type: Number
 *            description: Cleaning fee
 *          extra_people:
 *            type: Number
 *            description: Extra people
 *          guests_included:
 *            type: Number
 *            description: Guests Included
 *          images: 
 *            type: Object
 *            description: Images 
 *          host: 
 *            type: Object
 *            description: Hosts
 *          address: 
 *            type: Object
 *            description: Address
 *          availability: 
 *            type: Object
 *            description: Availability Status
 *          review_scores: 
 *            type: Object
 *            description: Reviews Scores
 *          reviews: 
 *            type: Object
 *            description: Reviews
 *       example:
 *               
 */

/**
  * @swagger
  * tags:
  *   name: Lists
  *   description: The Airbnb property list managing API
  */


/**
 * @swagger
 * /lists:
 *    get:
 *      summary: Returns a whole list of the airbnb property
 *      tags: [Lists]
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
        const listsRes = await list.find().limit(10)
        console.log(listsRes, 'LISTS')
        res.send(listsRes)
        res.json(listsRes)

    } catch (err) {
        console.log(err)
    }
})

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get the airbnb property by id
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The airbnb property list id
 *     responses:
 *       200:
 *         description: The airbnb property description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       404:
 *         description: The airbnb property was not found
 */

router.get('/:id', async (req, res) => {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

    try {
        const listRes = await list
            .find({ _id: Number(req.params.id) })
        res.send(listRes)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router