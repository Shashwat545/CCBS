const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");

exports.getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const userData=await user.populate("bookings");
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).send("Error in getting user" + err);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).send("Error in getting user" + err);
  }
};

exports.putUserInfo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.user.phoneNo = req.body.phoneNo || null;
    req.user.rollNo = req.body.rollNo || null;

    await req.user.save();
    const { emailId, userName, phoneNo, role, rollNo } = req.user;
    const userDetails = {
      emailId,
      userName,
      phoneNo,
      role,
      picture: req.session.user.picture,
    };
    if (rollNo) {
      userDetails.rollNo = rollNo;
    }
    res.status(200).json(userDetails);
  } catch (err) {
    next(err);
  }
};

exports.patchUserInfo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.body.phoneNo) {
      req.user.phoneNo = req.body.phoneNo;
    }
    if (req.body.rollNo) {
      req.user.rollNo = req.body.rollNo;
    }

    await req.user.save();
    const { emailId, userName, phoneNo, role, rollNo } = req.user;
    const userDetails = {
      emailId,
      userName,
      phoneNo,
      role,
      picture: req.session.user.picture,
    };
    if (rollNo) {
      userDetails.rollNo = rollNo;
    }
    res.status(200).json(userDetails);
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  // If user is registered, send all details of the user
  const { emailId, userName, phoneNo, role, rollNo, bookings } = req.user;
  const userDetails = {
    emailId,
    userName,
    role,
    bookings,
    picture: req.session.user.picture,
  };
  if (phoneNo) {
    userDetails.phoneNo = phoneNo;
  }
  if (rollNo) {
    userDetails.rollNo = rollNo;
  }
  res.status(200).json(userDetails);
};
