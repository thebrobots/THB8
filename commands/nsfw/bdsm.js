const Util = require("../../utilities/plugins");
const request = require("request");
const { nonsfw } = require("../../messages/nsfw");
let subreddit = ["bdsm", "BDSMGW"];

module.exports = {
  name: "bdsm",
  description: "Sends a random BDSM picture",
  aliases: ["dominatrix", "domme"],
  usage: "",
  cooldown: 2,
  args: 0,
  catergory: "NSFW",
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
