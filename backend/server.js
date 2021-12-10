//This will be the server setup
require("dotenv").config();

const app = require("./app.js");
const mongoose = require("mongoose");

const viewAllBooking = require('./routes/viewAllBookingRoute')

const port = process.env.PORT || 3000;

//Adding Mongodb url
const MONGO_URL = process.env.mongo_url;

//Connect server to mongodb
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log("Starting webserver..");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB server! Shutting down...");
    console.log(err);
  });


  const con = mongoose.connection

  con.on('open',() => {
    console.log("connected....")
  })


  app.use('/viewAllBookings',viewAllBooking)


  app.listen(port, () =>   {
    console.log("server started")
  })