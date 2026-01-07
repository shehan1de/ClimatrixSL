const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");

router.post("/save_history", async (req, res) => {
  try {
    await new Prediction(req.body).save();
    res.status(200).json({ message: "Saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save" });
  }
});

router.get("/", async (req, res) => {
  const data = await Prediction.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
