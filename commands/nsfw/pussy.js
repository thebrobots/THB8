const Util = require("../../utilities/plugins");
const { nonsfw } = require("../../messages/nsfw");

let subreddit = ["pelfie", "pussy", "rearpussy", "vagina", "vulva"];

module.exports = {
  name: "pussy",
  description: "Sends a random pussy images",

  cooldown: 5,

  async execute(client, message, args) {
    try {
      if (!message.channel.nsfw) {
        return nonsfw(message);
      } else {
        Util.subredditimage(subreddit, message);
      }
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  },
};
