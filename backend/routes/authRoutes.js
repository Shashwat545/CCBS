const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/status", authController.isAuthenticated, (req, res) => {
  res.sendStatus(204);
});
router.get("/google/challenge", authController.getCodeChallenge);
router.post("/google/login", authController.googleLogin);
router.post("/logout", authController.logout);

module.exports = router;
