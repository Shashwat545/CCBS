const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");

exports.postCreateUser = async (req, res) => {
  // If user is already registered, return 400 Bad Request
  if (req.user) {
    return res
      .status(400)
      .json({ errors: `User '${req.user.emailId}' is already registered` });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get emailId and userName from session, phoneNo and rollNo from request
  // body, and role assigned by default is "student".
  const newUser = new userModel({
    emailId: req.session.user.emailId,
    userName: req.session.user.userName,
    phoneNo: req.body.phoneNo,
    role: "student",
    rollNo: req.body.rollNo || null,
  });
  await newUser.save();

  const { emailId, userName, phoneNo, role, rollNo } = newUser;
  res.status(201).json({
    emailId,
    userName,
    phoneNo,
    role,
    rollNo,
    picture: req.session.user.picture,
  });
};

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

    req.user.phoneNo = req.body.phoneNo;
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
  if (req.user) {
    // If user is registered, send all details of the user
    const { emailId, userName, phoneNo, role, rollNo } = req.user;
    const userDetails = {
      registered: true,
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
  } else {
    // Send the details fetched from OIDC
    const { emailId, userName, picture } = req.session.user;
    res.status(200).json({
      registered: false,
      emailId,
      userName,
      picture,
    });
  }
};
