const Discord = require("discord.js");
const msgModel = require("../../models/messages");
const user = require("../../models/user");

module.exports = {
  name: "messages",
  aliases: ["msg"],
  description: "Show your messages count in the server!",
  botPerms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    let target;
    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else {
      target = message.author;
    }

    const msgDoc = await msgModel.findOne({
      guildID: message.guild.id,
      memberID: target.id,
    });

    const ub = await user.findOne({
      User: target.id,
    });

    let msgs;
    if (!msgDoc) {
      msgs = 0;
    } else {
      msgs = msgDoc.messages;
    }

    let msg;
    if (!ub) {
      msg = 0;
    } else {
      msg = ub.Messages;
    }

    let msgBadges;

    if (msg < 100) {
      msgBadges =
        `\`${100 - msg}\`` + " messages to get `bronze messager` badge!";
    } else if (msg > 100 && msg < 500) {
      msgBadges =
        `\`${500 - msg}\`` + " messages to get `silver messager` badge!";
    } else if (msg > 100 && msg > 500 && msg < 1000) {
      msgBadges =
        `\`${1000 - msg}\`` + " messages to get `golden messager` badge!";
    } else if (msg > 100 && msg > 500 && msg > 1000 && msg < 5000) {
      msgBadges =
        `\`${5000 - msg}\`` + " messages to get `diamond messager` badge!";
    }
    let messagesEmbed = new Discord.MessageEmbed()
      .setColor("#ffe65d")
      .setTitle("<:sh_chat:816782070063431740> Messages")
      .setDescription(`${target} has \`${msg}\` messages!\r\n\r\n${msgBadges}`);
    message.channel.send(messagesEmbed);
  },
};
