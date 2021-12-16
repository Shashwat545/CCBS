/**
 * @file Validation schema for
 */
const { checkSchema } = require("express-validator");

const getBookingSchema = checkSchema({
  startTime: {
    optional: true,
    isISO8601: {
      errorMessage:
        "Start time should be a valid time expressed according to ISO 8601",
      options: {
        strict: true,
      },
    },
    toDate: true,
  },
  endTime: {
    optional: true,
    isISO8601: {
      errorMessage:
        "End time should be a valid time expressed according to ISO 8601",
      options: {
        strict: true,
      },
    },
    toDate: true,
  },
});

module.exports = getBookingSchema;
