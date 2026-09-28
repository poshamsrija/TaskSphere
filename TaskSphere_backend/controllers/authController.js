const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const { sendError } = require("../utils/response");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, "Name, email, and password are required");
    }

    const existingUser = await connectDB.findUserByEmail(email);
    if (existingUser) {
      return sendError(res, 400, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await connectDB.createUserRecord({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const user = await connectDB.findUserByEmail(email);

    if (!user) {
      return sendError(res, 400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, 400, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

module.exports = { registerUser, loginUser };