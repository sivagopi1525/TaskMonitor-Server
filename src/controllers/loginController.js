const User = require('../models/user');
const jwt = require('jsonwebtoken');
const error=require('../middlewares/errorHandler')
const jwtSecret = process.env.jwtSecret; // FIXED (same everywhere)

async function Login(req, res) {
  try {
    console.log("Login Request Body:", req.body);
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return res.json({
      msg: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ msg: error.errorHandler });
  }
}

async function Register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { Login, Register };
