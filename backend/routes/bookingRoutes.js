const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel.js");

const bookingController = require('../controllers/bookingController.js');

router.get('/', bookingController.getAllBookings)

router.get('/:id', bookingController.getBooking)

router.post('/:id', bookingController.createBooking)

router.delete('/:id', bookingController.deleteBooking)

router.patch('/:id',bookingController.updateBooking)

module.exports = router;