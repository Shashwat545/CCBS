const express = require("express");
const router = express.Router();

const approvalController = require("../controllers/superAdminController.js");

// router.get('/',approvalController.getApprovalStatus);
router.get("/:status/:bookingId", approvalController.getApprovalStatus);

module.exports = router;
