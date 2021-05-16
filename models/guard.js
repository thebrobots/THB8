const mongoose = require("mongoose");

const guard = new mongoose.Schema({
  Guild: String,
  Words: Array,
});

module.exports = mongoose.model("guard", guard);
