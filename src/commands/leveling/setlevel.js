const Levels = require("discord-xp");
module.exports = {
  name: "setlevel",
  description: "Change a member's level",
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    Levels.setURL(process.env.mongo_url);

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

    if (!argsLevel) {
      return message.channel.send("Please provide the level you want to set");
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
