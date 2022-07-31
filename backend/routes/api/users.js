const express = require("express");

const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Booking, Review, Spot, User } = require('../../db/models')
const sequelize = require('sequelize')
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/sign-up", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const trackEmail = await User.findOne({
    where: { email }
  })
  if (trackEmail) {
    res.status(403);
    res.json({
      message: "User with that email already exists!"
    })
  }
  try {
    const user = await User.signup({ firstName, lastName, email, password });
    const token = await setTokenCookie(res, user);

    const newUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    };

    return res.json(newUser);
    
  } catch (error) {
    res.status(403);
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    })
  }

});

//Get the Current User
router.get("/currentUser", requireAuth, async (req, res) => {
  const user = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };
  return res.json(user);
});


module.exports = router;
