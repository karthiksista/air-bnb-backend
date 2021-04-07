const express = require('express')
const list = require('../models/Lists')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const codes = await list.find({}, { country_code: 1, _id: 0 }).select('address.country_code')
        const countries = await list.find({}, { country: 1, _id: 0 }).select('address.country')

        // console.log()
        const finalCodes = codes.map(ele => ele.address.country_code)
        const finalCountries = countries.map(ele => ele.address.country)
        const allUniqueCodes = new Set(finalCodes)
        const allUniqueCountries = new Set(finalCountries)
        let codeArr = Array.from(allUniqueCodes)
        let countriesArr = Array.from(allUniqueCountries)
        let finalARr = []
        for (let i = 0; i < codeArr.length; i++) {
            let obj = {}
            obj['code'] = codeArr[i]
            obj['country'] = countriesArr[i]
            finalARr.push(obj)
        }
        console.log(finalARr, 'YESSSS')
        res.send(finalARr)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
