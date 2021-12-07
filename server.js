//This will be the server setup
const app = require("./app.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

//Adding Mongodb url
const MONGO_URL =
  "mongodb+srv://ccbooking:ccbookingsystem@cluster0.hyyed.mongodb.net/CC Booking System?retryWrites=true&w=majority";

//Connect server to mongodb
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log("Starting webserver..");
    app.listen(port,() => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB server! Shutting down...");
    console.log(err);
  });
