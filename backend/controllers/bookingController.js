express = require("express");

const bookingModel = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
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
