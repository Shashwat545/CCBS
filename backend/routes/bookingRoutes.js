const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel.js");


router.get('/', async (req,res) => {
    try{
            const bookings = await bookingModel.find();
            res.status(200).json(bookings);
    }catch(err){
            res.send("Error in booking" + err)
    }
})

module.exports = router;