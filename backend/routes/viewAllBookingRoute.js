const express = require("express")
const router = express.Router()
const bookingModel = require("../models/bookingModel.js")


router.get('/', async (req,res) => {
    try{
            const booking = await bookingModel.find()
            res.json(booking)
    }catch(err){
            res.send("Error in booking" + err)
    }
})

module.exports = router