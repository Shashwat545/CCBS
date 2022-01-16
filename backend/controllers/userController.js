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
    res.status(200).json(user);
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

exports.updateUserInfo = async (req, res) => {
  try {
    const updatedEmailId = req.body.emailId;
    const updatedName = req.body.name;
    const updatedPhoneNo = req.body.phoneNo;
    const updatedRollNo = req.body.rollNo;

    const updatedUser = await userModel.findById(req.params.userId);

    updatedUser.emailId = updatedEmailId;
    updatedUser.userName = updatedName;
    updatedUser.phoneNo = updatedPhoneNo;
    updatedUser.rollNo = updatedRollNo;

    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
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
