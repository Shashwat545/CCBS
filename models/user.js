const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  emailid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
