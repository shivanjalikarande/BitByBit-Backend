const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { userId, email } = req.body;
  try {
    await User.createUser(userId, email);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const user = await User.getUser(req.params.userId);
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

module.exports = router;
