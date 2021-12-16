/**
 * @file Validation schema for Google OAuth login endpoint.
 */
const { checkSchema } = require("express-validator");

const googleLoginSchema = checkSchema({
  code: {
    in: "body",
    errorMessage: "Authorization code is required",
    isString: { errorMessage: "Authorization code should be a string" },
    notEmpty: { errorMessage: "Authorization code cannot be empty" },
  },
});

module.exports = googleLoginSchema;
