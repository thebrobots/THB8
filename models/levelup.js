const mongoose = require("mongoose");

const levelup = new mongoose.Schema({
  Guild: String,
  Channel: String,
});

module.exports = mongoose.model("levelup", levelup);