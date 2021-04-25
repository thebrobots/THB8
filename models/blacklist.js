const mongoose = require("mongoose");

const blacklist = new mongoose.Schema({
  Guild: String,
  Words: Array,
});

module.exports = mongoose.model("blacklist", blacklist);
