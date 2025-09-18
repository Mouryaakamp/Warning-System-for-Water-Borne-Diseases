const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DistrictAuth = require("../model/DistrictAuth");

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// Admin creates taluk login
router.post("/create-taluk", async (req, res) => {
  try {
    const { talukName, username, password } = req.body;

    // Check if taluk already exists
    const existingTaluk = await DistrictAuth.findOne({ talukName });
    if (existingTaluk) {
      return res.status(400).json({ message: "Taluk already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new DistrictAuth({ talukName, username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Taluk login (returns JWT)
router.post("/login", async (req, res) => {
  try {
    const { username, password, taluk } = req.body;

    const user = await DistrictAuth.findOne({ username, talukName: taluk });
    if (!user) return res.status(404).json({ error: "Invalid username or taluk" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Create JWT token
    const token = jwt.sign(
      { talukName: user.talukName, username: user.username },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
