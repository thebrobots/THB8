const Util = require("../../utilities/plugins");
const request = require("request");
const { nonsfw } = require("../../messages/nsfw");
let subreddit = ["ass", "TheUnderbun", "booty", "SpreadEm", "HighResASS"];

module.exports = {
  name: "ass",
  description: "Sends a random ass images",
  aliases: ["asses", "butt"],
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
