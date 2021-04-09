const express = require('express')
const list = require('../models/Lists')
const country = require('../models/Countries')

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
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
  *   name: Country
  *   description: The Airbnb property list managing API
  */





/**
 * @swagger
 * /country/{country}:
 *   get:
 *     summary: Get the Airbnb properties by Country
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: The airbnb property list by Country
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


router.get('/:country', async (req, res) => {
    const PAGE_SIZE = 10
    const page = (parseInt(req.query.page) || 0)
    const sort = req.query.sort === 'desc' ? { price: -1 } : { price: 1 }
    console.log(req.query, 'PAGE') //bedrooms:1
    const total = await list.countDocuments({ 'address.country_code': req.params.country, 'bedrooms': req.query.roomtype || 1 })
    try {
        const posts = await list
            .find({ 'address.country_code': req.params.country, 'bedrooms': req.query.roomtype || 1 },
                { name: 1, address: 1, images: 1, price: 1, description: 1, bedrooms: 1, guests_included: 1, beds: 1, bathrooms: 1, number_of_reviews: 1 })
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * page)
            .sort(sort)
        // console.log(posts, '@@@')
        // res.send(posts)
        res.json({
            totalPages: Math.ceil(total / PAGE_SIZE),
            posts
        })

    } catch (err) {
        console.log(err)
    }
})


/**
 * @swagger
 * /country/allCodes:
 *   get:
 *     summary: Get the Airbnb Countries
 *     tags: [Country]
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

/**
  * @swagger
  * tags:
  *   name: Country
  *   description: The Airbnb property list managing API
  */

router.get('/allCodes', async (req, res) => {
    console.log('DSSTSTSDTT')
    try {
        const what = await list
            .find()
            .limit(1)
        // // .select('property_type')
        res.send(what)

    } catch (err) {
        console.log(err)
    }
})

module.exports = router