const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/',userController.postCreateUser);
router.get("/getUser/:userId", userController.getOneUser);
router.get("/allUsers", userController.getAllUser);
router.patch("/editPorfile/:userId", userController.updateUserInfo);

module.exports = router;
