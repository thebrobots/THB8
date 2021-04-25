const mongoose = require("mongoose");

const captcha = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Role: String,
});

module.exports = mongoose.model("captcha", captcha);
