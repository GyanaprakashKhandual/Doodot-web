const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/token.util');
const { sendOTPEmail } = require('../configs/mail.config');

const generateOTP = require('../utils/otp.util');


// Send OTP to user's email
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to database
    await OTP.create({ email, otp });

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP and register user
const verifyOTPAndRegister = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // Find the OTP record
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    const now = new Date();
    const otpCreatedAt = new Date(otpRecord.createdAt);
    const diffInMinutes = (now - otpCreatedAt) / (1000 * 60);

    if (diffInMinutes > 5) { // OTP expires after 5 minutes
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      isVerified: true,
    });

    // Delete the used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data (excluding password) and token
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Error in verifyOTPAndRegister:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email); // Debug log

    const user = await User.findOne({ email });
    console.log('User found:', user); // Debug log

    if (!user) {
      console.log('No user found with this email'); // Debug log
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('Stored hashed password:', user.password); // Debug log
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password valid:', isPasswordValid); // Debug log

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);

    // Return user data (excluding password) and token
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};


const googleAuthSuccess = async (req, res) => {
  try {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Return user data (excluding password) and token
    const userResponse = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isVerified: req.user.isVerified,
    };

    res.status(200).json({
      message: "Google authentication successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Error in googleAuthSuccess:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getUserDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendOTP,
  verifyOTPAndRegister,
  loginUser,
  logoutUser,
  googleAuthSuccess,
  getUserDetails
};