const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

const userSchema = new Schema({
  emailId: {
    type: mongoose.SchemaTypes.Email,
    required: [true, "Please provide your email"],
    trim: true,
    unique: true,
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
