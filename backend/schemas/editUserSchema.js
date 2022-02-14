/**
 * @file Validation schema for registration of authenticated users.
 */
const { checkSchema } = require("express-validator");

// Regular expression to match roll numbers. Should be of the form 'DDAADDDD',
// where 'D' is a digit, and 'A' is an alphabet (case insensitive).
const rollNoRegExp = /^\d{2}[A-Za-z]{2}\d{5}$/;

const editUserSchema = checkSchema({
  phoneNo: {
    in: "body",
    optional: true,
    isMobilePhone: {
      errorMessage: '"phoneNo" field should be a valid phone number',
    },
  },
  rollNo: {
    in: "body",
    optional: true,
    isString: {
      errorMessage: "Expected roll number to be a string",
    },
    custom: {
      options: (value) => {
        if (!rollNoRegExp.test(value)) {
          throw new Error(`Roll number should match ${rollNoRegExp}`);
        }
        return value;
      },
    },
    customSanitizer: {
      options: (value) => {
        return value.toUpperCase();
      },
    },
  },
});

module.exports = editUserSchema;
