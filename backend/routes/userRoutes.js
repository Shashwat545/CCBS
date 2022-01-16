const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  isRegistered,
} = require("../controllers/authController");
const userController = require("../controllers/userController");
const {
  registerUserSchema,
  patchUserSchema,
} = require("../schemas/registerUserSchema");

router.post(
  "/",
  isAuthenticated,
  registerUserSchema,
  userController.postCreateUser
);

router.get("/getUser/:userId", userController.getOneUser);

router.get("/allUsers", userController.getAllUser);

router.get("/me", isAuthenticated, userController.getCurrentUser);

router.put("/me", isRegistered, registerUserSchema, userController.putUserInfo);

router.patch(
  "/me",
  isRegistered,
  patchUserSchema,
  userController.patchUserInfo
);

module.exports = router;
