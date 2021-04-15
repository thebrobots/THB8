const Discord = require("discord.js");
const chatModel = require("../../models/chatbot");

module.exports = {
  name: "chatbot",
  description: "Enable or disable chatbot channel",

  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const query = args[0]?.toLowerCase();

    const cbDoc = await chatModel.findOne({
      Guild: message.guild.id,
    });

    if (query === "enable") {
      const channels = message.mentions.channels.first() || message.channel;

      const channel = channels.id;

      if (cbDoc) {
        await chatModel.findOneAndDelete({
          Guild: message.guild.id,
        });

        let newDoc = new chatModel({
          Guild: message.guild.id,
          Channel: channel,
        });

        await newDoc.save().catch((err) => console.log(err));
        message.reply(`Chatbot has been moved to <#${channel}>`);
      } else {
        let newDoc = new chatModel({
          Guild: message.guild.id,
          Channel: channel,
        });

        await newDoc.save().catch((err) => console.log(err));
        message.reply(`Chatbot has been enabled in <#${channel}>`);
      }
    }

    if (query === "disable") {
      if (cbDoc) {
        await chatModel.findOneAndDelete({
          Guild: message.guild.id,
        });

        message.reply(`Chatbot has been disabled in this server`);
      } else {
        message.reply(`Chatbot is not enabled in this server`);
      }
    }
  },
};
