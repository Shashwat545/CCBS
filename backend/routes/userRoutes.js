const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../controllers/authController");
const userController = require("../controllers/userController");
const registerUserSchema = require("../schemas/registerUserSchema");

router.post(
  "/",
  isAuthenticated,
  registerUserSchema,
  userController.postCreateUser
);
router.get("/getUser/:userId", userController.getOneUser);
router.get("/allUsers", userController.getAllUser);
router.patch("/editPorfile/:userId", userController.updateUserInfo);
router.get("/me", isAuthenticated, userController.getCurrentUser);

module.exports = router;
