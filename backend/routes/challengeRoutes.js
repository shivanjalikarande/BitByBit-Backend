const express = require("express");
const Challenge = require("../models/Challenge");

const router = express.Router();

router.get("/", async (req, res) => {
  const challenges = await Challenge.getChallenges();
  res.json(challenges);
});

module.exports = router;
