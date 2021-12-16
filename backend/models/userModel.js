const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  emailId: {
    type: String,
    required: [true, "Please provide your email"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  userName: {
    type: String,
    required: [true, "Name of the user should be specified"],
  },
  phoneNo: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  role: {
    type: String,
    required: [true, "Role of the user should be specified"],
    enum: ["student", "admin", "superAdmin"],
    default: "student",
  },
  rollNo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
