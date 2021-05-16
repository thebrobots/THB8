const mongoose = require("mongoose");

const user = new mongoose.Schema({
  User: String,
  Reps: Number,
  AFK: String,
  Messages: Number,
  Repcooldown: Number,
  Blacklisted: Boolean,
});

module.exports = mongoose.model("user", user);
