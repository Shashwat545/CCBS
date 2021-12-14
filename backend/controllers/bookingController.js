express = require("express");
const { validationResult } = require("express-validator");

const bookingModel = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const bookingFilter = {};
  // If a booking's end time occurs before the start time specified in the
  // request, then we filter them out.
  if (req.body.startTime) {
    bookingFilter["endTime"] = { $gte: req.body.startTime };
  }
  // Similarly, if a booking's start time is after the end time specified in the
  // request, then we filter them out
  if (req.body.endTime) {
    bookingFilter["startTime"] = { $lte: req.body.endTime };
  }

  try {
    const bookings = await bookingModel.find(bookingFilter);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOneBooking = async (req, res) => {
  try {
    const bookings = await bookingModel.findById(req.params.bookingId);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).send("Error in booking" + err);
  }
};

const createBooking = async (req, res) => {
  //1) see if there is a booking already in conflict with this

  //2) If there are bookings in conflict
  //    a) if the user is an Admin (professors etc)
  //        -> allow booking and send for approval
  //        -> inform to the previously booked users via email
  //    b) if the user is a SuperAdmin
  //        -> allow booking without needing approval
  //        -> inform to the previously booked users via email
  //    c) if the user is a student
  //        -> inform them that there are already slots booked on those days
  //   If there is no conflict
  //    -> allow booking and send for approval

  
  const newBooking = new bookingModel({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    reason: req.body.reason,
  });
  try {
    const bookRequest = await newBooking.save();
    res.status(200).json(bookRequest);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteBooking = async (req, res) => {
  try {
    await bookingModel.findByIdAndRemove(req.params.bookingId);
    res.status(200).send("Booking deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateBooking = async (req, res) => {
  try {
        const updatedStartTime= req.body.startTime;
        const updatedEndTime= req.body.endTime;
        const updatedReason= req.body.reason;
        const result = await bookingModel.findByIdAndUpdate(
          req.params.bookingId,
          {
            $set: {
              startTime: updatedStartTime,
              endTime: updatedEndTime,
              reason: updatedReason,
            },
          },
          { new: true }
        );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  getOneBooking,
  deleteBooking,
  updateBooking,
};
