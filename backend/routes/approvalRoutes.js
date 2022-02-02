const express = require("express");
const router = express.Router();

const approvalController = require("../controllers/superAdminController.js");
const { isAuthenticated } = require("../controllers/authController");
const getBookingSchema = require("../schemas/getBookingSchema");

// router.get('/',approvalController.getApprovalStatus);
router.get(
  "/:status/:bookingId",
  approvalController.isSuperAdmin,
  isAuthenticated,
  getBookingSchema,
  approvalController.getApprovalStatus
);

module.exports = router;
