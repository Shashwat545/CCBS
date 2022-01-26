const bookingModel = require("./../models/bookingModel");

const superAdmin = [
  "abc@iitbbs.ac.in",
  "abc2@iitbbs.ac.in",
  "abc3@iitbbs.ac.in",
];

exports.getSuperAdmin = (req, res) => {
  res.status(200).json(superAdmin);
};

exports.getApprovalStatus = async (req, res) => {
  const status = req.params.status;
  const userRole = req.user.role;
  // const userRole = "superAdmin";

  if (userRole !== "superAdmin")
    res.status(401).send("You are not authorized to this");
  const bookingId = req.params.bookingId;
  //Tell user that your booking{bookingId} is cancelled via mail and delete the booking also from database
  if (status === "reject") {
    try {
      await bookingModel.findByIdAndRemove(req.params.bookingId);
      res.status(200).json("Booking deleted successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const userBooking = await bookingModel.findById(bookingId);
      let pendingIndex = 0,
        flag = 1;
      for (const superAdmin in userBooking.approvedBy) {
        pendingIndex++;
        if (userBooking.approvedBy[superAdmin] === "pending") {
          if (pendingIndex === 3) {
            flag = 0;
            userBooking.approvedBy[superAdmin] = "accepted";
            console.log("Send Email!!!!");
            //send a mail that you booking is confirmed

            //Deleting all other booking which are conflicted

            //This will find all the existing booking
            const allbookings = await bookingModel.find();

            //This will fliter out the conflict containing booking
            const conflictbookings = allbookings.filter((booking) => {
              if (
                !(booking.startTime >= userBooking.endTime) &&
                !(booking.endTime <= userBooking.startTime) &&
                booking._id.toString() !== bookingId
              ) {
                return booking;
              }
            });
            if (conflictbookings.length > 0)
              conflictbookings.map(async (booking) => {
                await bookingModel.findByIdAndRemove(booking._id);
              });

            await userBooking.save();
            res.status(200).json(`${bookingId} confirmed`);
          } else {
            userBooking.approvedBy[superAdmin] = "accepted";
            await userBooking.save();
            res
              .status(200)
              .json(`${bookingId} confirmed by SuperAdmin ${pendingIndex}`);
          }
          break;
        }
      }
      if (flag) {
        console.log("Already Booked");
        res
          .status(200)
          .send(`${bookingId} is already confirmed no futher need`);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
