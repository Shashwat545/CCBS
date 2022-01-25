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

  if (userRole !== "superAdmin")
    res.status(401).send("You are not authorized to this");
  const bookingId = req.params.bookingId;
  //Tell user that your booking{bookingId} is cancelled via mail and delete the booking also from database
  if (status === "reject") {
    try {
      await bookingModel.findByIdAndRemove(req.params.bookingId);
      res.status(200).send("Booking deleted successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const userBooking = await bookingModel.findById(bookingId);
      let pendingIndex = 0;
      for (const superAdmin in userBooking.approvedBy) {
        pendingIndex++;
        if (userBooking.approvedBy[superAdmin] === "pending") {
          if (pendingIndex === 3) {
            userBooking.approvedBy[superAdmin] = "accepted";
            console.log("Send Email!!!!");
            //send a mail that you booking is confirmed

            //Deleting all other booking which are conflicted
            //This will find all the existing booking
            const allbookings = await bookingModel.find();

            //This will fliter out the conflict containing booking
            const conflictbookings = allbookings.filter((booking) => {
              if (
                !(booking.startTime >= newBooking.endTime) &&
                !(booking.endTime <= newBooking.startTime) &&
                booking._id !== bookingId
              ) {
                return booking;
              }
            });
            conflictbookings.map(async (booking) => {
              await bookingModel.findByIdAndRemove(booking._id);
            });

            res.status.send(`${bookingId} confirmed`);
          } else {
            userBooking.approvedBy[superAdmin] = "accepted";
            res.status.send(
              `${bookingId} confirmed by SuperAdmin${pendingIndex}`
            );
          }
          break;
        }
      }
      userBooking.save();
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
