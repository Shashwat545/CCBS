const express = require("express");
const router = express.Router();

const bookingController = require('../controllers/bookingController.js');

router.get('/', bookingController.getAllBookings)

router.get('/:bookingId', bookingController.getOneBooking)

router.post('/', bookingController.createBooking)

router.delete('/:bookingId', bookingController.deleteBooking)

router.patch('/:bookingId',bookingController.updateBooking)

module.exports = router;