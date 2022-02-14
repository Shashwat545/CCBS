const bookingModel = require("./../models/bookingModel");
const nodemailer = require("./nodeMailerController");

const superAdmin = [
  "abc@iitbbs.ac.in",
  "abc2@iitbbs.ac.in",
  "abc3@iitbbs.ac.in",
];

exports.getSuperAdmin = (req, res) => {
  res.status(200).json(superAdmin);
};

async function nodemailerSendMail(action, user, booking) {
  await nodemailer.transporter.sendMail(action(user, booking));
}

exports.getApprovalStatus = async (req, res) => {
  const status = req.params.status;
  //  const userRole = req.user.role;
  const userRole = "superAdmin";

  if (userRole !== "superAdmin")
    res.status(401).send("You are not authorized to this");
  const bookingId = req.params.bookingId;
  const userBooking = await bookingModel.findById(bookingId);
  //Tell user that your booking{bookingId} is cancelled via mail and delete the booking also from database
  if (status === "reject") {
    try {
      nodemailerSendMail(nodemailer.bookingCancellation, req.user, userBooking);
      await bookingModel.findByIdAndRemove(req.params.bookingId);
      res.status(200).json("Booking deleted successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      let pendingIndex = 0,
        flag = 1;
      for (const superAdmin in userBooking.approvedBy) {
        pendingIndex++;
        if (userBooking.approvedBy[superAdmin] === "pending") {
          if (pendingIndex === 3) {
            flag = 0;
            userBooking.approvedBy[superAdmin] = "accepted";
            console.log("Send Email!!!!");
            nodemailerSendMail(
              nodemailer.bookingConfirmation,
              req.user,
              userBooking
            );
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
              await Promise.all(
                conflictbookings.map((booking) =>
                  bookingModel.findByIdAndRemove(booking._id).exec()
                )
              );

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
      // if (flag) {
      //   console.log("Already Booked");
      //   res
      //     .status(200)
      //     .send(`${bookingId} is already confirmed no futher need`);
      // }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

exports.isSuperAdmin = (req, res, next) => {
  next();
  // if (req.user.role==="superAdmin") {
  //   next();
  // } else {
  //   next(createError(401));
  // }
};
