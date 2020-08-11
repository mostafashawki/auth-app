const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user");
const checkAuth = require("../middleware/authChecker");

/**
 * @route   POST /register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", user_controller.user_register);

/**
 * @route   PUT /phone
 * @desc    Update user phone details and Send SMS OTP verfication code
 * @access  Private
 */
router.put("/phone", checkAuth, user_controller.user_phone);

/**
 * @route   POST /verify
 * @desc    Send SMS OTP verfication code
 * @access  Private
 */
router.post("/verify", checkAuth, user_controller.user_verify);

// @route   POST /login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", user_controller.user_login);

module.exports = router;
