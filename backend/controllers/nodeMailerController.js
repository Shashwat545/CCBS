"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount(); //we will have to delete this line in production

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user    //replace this with username no-reply@iitbbs.ac.in
      pass: testAccount.pass, // generated ethereal password   //replace this with our no-reply account password as process.env.emailPassword
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
    new NoReplyMail(
      "no-reply@iitbbs.ac.in",
      `${user.mailId}`, ////map the user mail here
      "Status of your Booking",
      `     Your Booking request is sent and currently is waiting for confirmation. Even if it gets confirmed, it may happen that your booking may be cancelled due to clash of another booking by a higher authority",
      "CCBS website link for see booking status of bookling: \n ${JSON.stringify(
        booking,
        null,
        "\n"
      )}` //// insert CCBS webside URL for seeing status of booking
    );
  };

  const bookingCancellation = (conflictingBooking) => {
    new NoReplyMail(
      "no-reply@iitbbs.ac.in",
      `${conflictingBooking.user.mailId}`,
      "Cancellation of your Booking Request",
      "     Your recent Booking Request has been cancelled as there was a slot clash with another booking done by a higher authority. You will have to re-book yook your slot at some other time on the website again.",
      "CCBS website link" ////  isnert CCBS website URL
    );
  };

  const bookingConfirmation = (user, booking) => {
    new NoReplyMail(
      "no-reply@iitbbs.ac.in",
      `${user.mailId}`,
      "Confirmation of your Booking",
      `     As of now, your recent booking is confirmed. Keep on checking the website for the status of your booking: \n ${JSON.stringify(
        booking,
        null,
        "\n"
      )} `,
      "CCBS website link" ////  isnert CCBS website URL
    );
  };

  const superBookingConfirmation = (user, booking) => {
    new NoReplyMail(
      "no-reply@iitbbs.ac.in",
      `${user.mailId}`,
      "Confirmation of your Booking",
      `     Your bookingis confirmed. Booking details are: \n ${JSON.stringify(
        booking,
        null,
        "\n"
      )} `,
      "CCBS website link" ////  isnert CCBS website URL
    );
  };

  const bookingReminder = new NoReplyMail(
    "no-reply@iitbbs.ac.in",
    "user.mail",
    "Reminder for your booking in Community Centre",
    "     As of now, your recent booking is confirmed and is from __time to __time on __date",
    "CCBS website link for see booking status of bookling" //// insert CCBS webside URL for seeing status of booking
  );

  // send mail with defined transport object
  //const sentMail = await transporter.sendMail(noReplyMail);

  console.log("Message sent: %s", sentMail.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sentMail));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

module.exports = {
  transporter,
  bookingCancellation,
  waitForConfirmation,
  bookingConfirmation,
  superBookingConfirmation,
  bookingReminder,
};
