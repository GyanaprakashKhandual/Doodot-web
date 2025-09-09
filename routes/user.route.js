const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");
const { registerValidation } = require("../middlewares/user.validator");
const validate = require("../middlewares/validate.middleware");
const passport = require("../configs/passport.config");
const jwt = require("jsonwebtoken");

// generateToken function directly here
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET, // from your .env
    { expiresIn: "30d" }        // token expiry (30 days)
  );
};

router.post("/send-otp", authController.sendOTP);

router.post(
  "/register",
  validate(registerValidation),
  authController.verifyOTPAndRegister
);

router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authController.getUserDetails);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user._id);

    res.redirect(`http://localhost:3000/app`);
  }
);

module.exports = router;
