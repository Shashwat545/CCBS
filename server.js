//This will be the server setup

let express = require("express");
let app = express();

app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

let port = process.env.PORT || 3000;

//Adding Mongo db url
let MONGO_URL =
  "mongodb+srv://ccbooking:ccbookingsystem@cluster0.hyyed.mongodb.net/CC Booking System?retryWrites=true&w=majority";

//Connected server to mongodb  
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
