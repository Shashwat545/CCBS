const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  startTime: {
    type: Date,
    required: [true, "Please provide Starting time of the event"],
    default: Date.now(),
  },
  endTime: {
    type: Date,
    required: [true, "Please provide Endting time of the event"],
    default: Date.now(),
  },
  reason: {
    type: String,
    required: [true, "Reason should be specified"],
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  isApproved: {
    type : Boolean,
    default : false
  }
});

module.exports = mongoose.model("Slot", slotSchema);
