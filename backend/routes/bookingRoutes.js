const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController.js");
const { isAuthenticated } = require("../controllers/authController");
const getBookingSchema = require("../schemas/getBookingSchema");

router.get(
  "/",
  isAuthenticated,
  bookingController.getAllBookings
);

router.get(
  "/:bookingId",
  isAuthenticated,
  bookingController.getOneBooking
);

router.post(
  "/createBooking",
  isAuthenticated,
  bookingController.createBooking
);

router.delete(
  "/:bookingId",
  isAuthenticated,
  bookingController.deleteBooking
);

router.patch(
  "/:bookingId",
  isAuthenticated,
  bookingController.updateBooking
);

module.exports = router;
