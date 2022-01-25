const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startTime: {
    type: Date,
    required: [true, "Please provide Starting time of the event"],
    default: Date.now(),
  },
  endTime: {
    type: Date,
    required: [true, "Please provide Ending time of the event"],
    default: Date.now(),
  },
  reason: {
    type: String,
    required: [true, "Reason should be specified"],
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  approvedBy: {
    superAdmin1: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
    superAdmin2: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
    superAdmin3: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
  },
});

module.exports = mongoose.model("booking", bookingSchema);
