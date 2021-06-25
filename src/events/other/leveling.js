module.exports = async (message) => {
  const setup = require("../../models/setup");
  const Discord = require("discord.js");

  const sb = await setup.findOne({ Guild: message.guild.id });
  // add random xp per message (between 1 - 30)
  const Levels = require("discord-xp");
  Levels.setURL(process.env.mongo_url);

  const randomXp = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXp
  );

  // level up message
  if (hasLeveledUp) {
    if (sb.Lvlchannel) {
      const ch = sb.Lvlchannel;
      const channel = message.guild.channels.cache.get(ch);
      const user2 = await Levels.fetch(message.author.id, message.guild.id);
      const { body } = await request.get(
        `https://ybf8-mcgen.herokuapp.com/a.php?i=40&h=Level+up%21&t=${message.author.username}+is+now+level+${user2.level}%21+`
      );

      const attach = new Discord.MessageAttachment(body, "levelup.png");
      channel.send(attach);
    }
  }
};
