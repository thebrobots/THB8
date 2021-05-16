const mongoose = require("mongoose");

const command = new mongoose.Schema({
  Guild: String,
  Command: String,
});

module.exports = mongoose.model("command", command);
