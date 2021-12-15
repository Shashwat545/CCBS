const userModel = require("../models/userModel");

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

  // const user = new userModel({
  //   emailId: "abc@iitbb.ac.in",
  //   userName: "Ritik",
  //   phoneNo: "8909876578",
  //   role: "superAdmin",
  // });
  // user
  //   .save()
  //   .then(() => {
  //     console.log("Dummy User Created");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const user = await userModel.findById("61b9cfbfdd6335527c1831db");
  // const newBooking2 = new bookingModel({
  //   startTime: req.body.startTime,
  //   endTime: req.body.endTime,
  //   reason: req.body.reason,
  //   bookedBy: user,
  // });
  // try {
  //   const bookRequest = await newBooking.save();
  //   res.status(200).json(bookRequest);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
  const newBooking = {
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    reason: req.body.reason,
    bookedBy: user, //it will req.user that is created at the start of the session
  };
  const allbookings = await bookingModel.find();
  const conflictbookings = allbookings.filter((booking) => {
    if (
      !(booking.startTime >= newBooking.endTime) &&
      !(booking.endTime <= newBooking.startTime)
    ) {
      return booking;
    }
  });
  if (conflictbookings.length > 0) {
    conflictbookings.map((user) =>
      user.populate("bookedBy").then((conflictbooking) => {
        if (conflictbooking.bookedBy.role === "superAdmin") {
          //Tell newbooking user that there is booking already.
            console.log("Student");
            res
            .status(200)
            .send(
              "Student : inform them that there are already slots booked on those days"
            );
        } else if (conflictbooking.bookedBy.role === "admin") {
          if (newBooking.bookedBy.role === "superAdmin") {
            //Create the slot and inform the confict user(student or admin) vai email that your booking is cancelled
          } else {
            //Thst is conflict contains admin or student
            console.log("Admin");
            res
              .status(200)
              .send(
                "Admin : inform them that there are already slots booked on those days"
              );
          }
        } else {
          res
            .status(200)
            .send(
              "Student2 : inform them that there are already slots booked on those days"
            );
        }
      })
    );
  } else {
    //Create the slot
    console.log("No conflict");
    // try {
    //   const bookRequest = await newBooking2.save();
    //   res.status(200).json(bookRequest);
    // } catch (err) {
    //   res.status(500).send(err);
    // }
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
    const updatedStartTime = req.body.startTime;
    const updatedEndTime = req.body.endTime;
    const updatedReason = req.body.reason;
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
