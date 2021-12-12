const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/google/consent", authController.oAuthRedirect);
router.post("/google/login", authController.googleLogin);
router.post("/logout", authController.logout);

module.exports = router;
