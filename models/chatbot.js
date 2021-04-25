const mongoose = require("mongoose");

const chatbot = new mongoose.Schema({
  Guild: String,
  Channel: String,
});

module.exports = mongoose.model("chatbot", chatbot);
