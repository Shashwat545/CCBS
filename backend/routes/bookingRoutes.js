const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController.js");
const { isAuthenticated } = require("../controllers/authController");
const getBookingSchema = require("../schemas/getBookingSchema");

router.get(
  "/",
  isAuthenticated,
  getBookingSchema,
  bookingController.getAllBookings
);

router.get(
  "/:bookingId",
  isAuthenticated,
  getBookingSchema,
  bookingController.getOneBooking
);

router.post(
  "/createBooking",
  isAuthenticated,
  getBookingSchema,
  bookingController.createBooking
);

router.delete(
  "/:bookingId",
  isAuthenticated,
  getBookingSchema,
  bookingController.deleteBooking
);

router.patch(
  "/:bookingId",
  isAuthenticated,
  getBookingSchema,
  bookingController.updateBooking
);

module.exports = router;
