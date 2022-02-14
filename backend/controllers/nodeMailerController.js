"use strict";
const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_ID, // generated ethereal user    //replace this with username no-reply@iitbbs.ac.in
    pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password   //replace this with our no-reply account password as process.env.emailPassword
  },
});

class NoReplyMail {
  constructor(from, to, subject, text, html) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }
}

const waitForConfirmation = (user, booking) => {
  return new NoReplyMail(
    "no-reply@iitbbs.ac.in",
    `${user.emailId}`, ////map the user mail here
    "Status of your Booking",
    `     Your Booking request is sent and currently is waiting for confirmation. Even if it gets confirmed, it may happen that your booking may be cancelled due to clash of another booking by a higher authority"
      "CCBS website link for see booking status of Booking: \n 
      booking Start Time: ${booking.startTime}
      booking End Time:  ${booking.endTime}
      Reason: ${booking.reason}
        "\n"
      ` //// insert CCBS webside URL for seeing status of booking
  );
};

const bookingCancellation = (user,booking) => {
  return new NoReplyMail(
    "no-reply@iitbbs.ac.in",
    `${user.emailId}`, ////map the user mail here
    "Cancellation of your CC Booking",
    `     Your Booking request is cancelled due to a slot clash.",
      "CCBS website link for see booking status of 
        "\n"
      ` //// insert CCBS webside URL for seeing status of booking
  );
};

const bookingConfirmation = (user, booking) => {
  return new NoReplyMail(
    "no-reply@iitbbs.ac.in",
    `${user.emailId}`, ////map the user mail here
    "CC Booking Confirmed",
    `     Your Booking request is sent and currently is confirmed. It may happen that your booking may be cancelled due to clash of another booking by a higher authority",
      "CCBS website link for see booking status of Booking: \n 
      booking Start Time: ${booking.startTime}
      booking End Time:  ${booking.endTime}
      Reason: ${booking.reason}
        "\n"
      ` //// insert CCBS webside URL for seeing status of booking
  );
};

const superBookingConfirmation = (user, booking) => {
  return new NoReplyMail(
    "no-reply@iitbbs.ac.in",
    `${user.emailId}`,
    "Confirmation of your CC Booking",
    `     Your bookingis confirmed. Booking details are: \n Booking: \n 
    booking Start Time: ${booking.startTime}
    booking End Time:  ${booking.endTime}
    Reason: ${booking.reason}
         "\n"`,
    "CCBS website link" ////  isnert CCBS website URL
  );
};

// const bookingReminder = new NoReplyMail(
//   "no-reply@iitbbs.ac.in",
//   "user.mail",
//   "Reminder for your booking in Community Centre",
//   "     As of now, your recent booking is confirmed and is from __time to __time on __date",
//   "CCBS website link for see booking status of bookling" //// insert CCBS webside URL for seeing status of booking
// );

// send mail with defined transport object
//const sentMail = await transporter.sendMail(noReplyMail);

//console.log("Message sent: %s", sentMail.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
//console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sentMail));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

module.exports = {
  transporter,
  bookingCancellation,
  waitForConfirmation,
  bookingConfirmation,
  superBookingConfirmation,
};
