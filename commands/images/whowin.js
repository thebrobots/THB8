const Discord = require("discord.js");
const { NekoBot } = require("nekobot-api");
const api = new NekoBot();
module.exports = {
  name: "whowin",
  description: "who would win?",

  async execute(client, message, args) {
    if(!message.mentions.users.size) {
        
    }
  },
};
