const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()   
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign Up a User
router.post("/signup", validateSignup, async (req, res) => {
  const {  firstName, lastName, username, email, password } = req.body;
  const validEmail = await User.findOne({
    where: { email }
  });

  if (validEmail) {
    res.status(403);
    res.json({
      message: "User with that email already exists",
    });
  }

  const newUser = await User.signup({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  if (!firstName) {
    res.status(400).json({
      message: "First Name is required",
    });
  }

  if (!lastName) {
    res.status(400).json({
      message: "Last Name is required",
    });
  }

  const token = await setTokenCookie(res, newUser);

  return res.json({
    newUser,
    token,
  });

});

// Get the Current User
router.get("/current", requireAuth, async (req, res) => {
  return res.json(req.user);
});




module.exports = router;
