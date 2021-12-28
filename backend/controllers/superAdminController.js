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
  //Tell user that your booking{bookingId} is cancelled via mail and delete the booking also from database
  if (status === "reject") userBooking.approvedBy[pendingIndex] = "rejected";
  else {
    const bookingId = req.params.bookingId;
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
          } else userBooking.approvedBy[superAdmin] = "accepted";
          break;
        }
      }
      userBooking.save();
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
