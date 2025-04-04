const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "keyforjwt";

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Set cookie for JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Profile route (get user details)
router.get("/profile", async (req, res) => {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(400).json({ message: "Invalid or expired token", error: err.message });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
