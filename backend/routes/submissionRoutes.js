const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { userId, challengeId, code, aiFeedback } = req.body;
  try {
    await Submission.submitChallenge(userId, challengeId, code, aiFeedback);
    res.status(201).json({ message: "Submission recorded!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
