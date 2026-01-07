const mongoose = require("mongoose");

module.exports = mongoose.model("Prediction", new mongoose.Schema({
  city: String,
  parameter: String,
  timeframe: String,
  min_or_max: String,
  predicted_value: Number,
  disaster_risk: String,
  forecast_message: String,
  forecast_series: [Number],
  createdAt: { type: Date, default: Date.now }
}));
