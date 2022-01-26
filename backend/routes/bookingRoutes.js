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

router.get("/:bookingId", bookingController.getOneBooking);

router.post("/createBooking", bookingController.createBooking);

router.delete("/:bookingId", bookingController.deleteBooking);

router.patch("/:bookingId", bookingController.updateBooking);

module.exports = router;
