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

router.get("/:email", async (req, res) => {
  try {
    //console.log(`req.params.email:${req.params.email}`)
    const user = await User.getUser(req.params.email);
    if (!user) return res.status(404).json({ error: "User not found" });
   // console.log(res.json(user));
    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
