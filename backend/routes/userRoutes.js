const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../controllers/authController");
const userController = require("../controllers/userController");
const editUserSchema = require("../schemas/editUserSchema");

router.get("/getUser/:userId", userController.getOneUser);

router.get("/allUsers", userController.getAllUser);

router.get("/me", isAuthenticated, userController.getCurrentUser);

router.put("/me", isAuthenticated, editUserSchema, userController.putUserInfo);

router.patch(
  "/me",
  isAuthenticated,
  editUserSchema,
  userController.patchUserInfo
);

module.exports = router;
