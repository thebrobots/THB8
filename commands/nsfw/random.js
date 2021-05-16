const Util = require("../../utilities/plugins");
const superagent = require("superagent");
const { nonsfw } = require("../../messages/nsfw");

module.exports = {
  name: "random",
  description: "Sends a random nsfw image",
  cooldown: 2,
  async execute(client, message, args) {
    try {
      if (!message.channel.nsfw) {
        return nonsfw(message);
      } else {
        Util.subredditimage(["hentai", "nsfw"], message);
      }
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  },
};
