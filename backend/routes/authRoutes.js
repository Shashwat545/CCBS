const express = require("express");
const authController = require("../controllers/authController");
const googleLoginSchema = require("../schemas/googleLoginSchema");
const router = express.Router();

router.get("/status", authController.isAuthenticated, (req, res) => {
  res.sendStatus(204);
});

router.get("/google/redirect", authController.googleRedirect);

router.post("/google/login", googleLoginSchema, authController.googleLogin);

router.post("/logout", authController.logout);

module.exports = router;
