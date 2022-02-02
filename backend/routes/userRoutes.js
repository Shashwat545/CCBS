const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../controllers/authController");
const getBookingSchema = require("../schemas/getBookingSchema");


router.post(
  "/",
  isAuthenticated,
  getBookingSchema,
  userController.postCreateUser
);
router.get(
  "/getUser/:userId",
  isAuthenticated,
  getBookingSchema,
  userController.getOneUser
);
router.get(
  "/allUsers",
  isAuthenticated,
  getBookingSchema,
  userController.getAllUser
);
router.patch(
  "/editPorfile/:userId",
  isAuthenticated,
  getBookingSchema,
  userController.updateUserInfo
);

module.exports = router;
