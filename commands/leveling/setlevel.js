const Levels = require("discord-xp");
const { MONGO_URL } = require("../../secured");

module.exports = {
  name: "setlevel",
  description: "Change a member's level",
  async execute(client, message, args) {
    Levels.setURL(MONGO_URL);
    
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.reply(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    
    let member;
    if (message.mentions.users.first()) {
      member = message.mentions.users.first();
    } else {
      member = message.author;
    }

    let argsLevel;
    if (message.mentions.users.first()) {
      argsLevel = args[1];
    } else {
      argsLevel = args[0];
    }
    
  if(!argsLevel) {
  return message.channel.send("Please provide the level you want to set")
  }
    
    const user = await Levels.fetch(member.id, message.guild.id);

    if (user.level > argsLevel) {
      Levels.setLevel(member.id, message.guild.id, `-${argsLevel}`);
    } else {
      Levels.setLevel(member.id, message.guild.id, argsLevel);
    }

    message.channel.send(`Set ${member}'s level to ${argsLevel}`);
  },
};
