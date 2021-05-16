const Util = require("../../utilities/plugins");
const request = require("request");
const { nonsfw } = require("../../messages/nsfw");
let subreddit = ["rule34pinups", "ahegao", "hentai", "Nekomimi"];

module.exports = {
  name: "hentai",
  description: "Sends a random hentai images",
  aliases: ["hentaianal"],
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
