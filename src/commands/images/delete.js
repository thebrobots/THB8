const DIG = require('discord-image-generation');
const Discord = require("discord.js")

module.exports = {
  name: "delete",
  aliases: ["del"],
  Description: "",
  botPerms: ["ATTACH_FILES"],
  async execute(client, message, args) {
    if (!message.mentions.users.first()) {
      let avatar = message.author.displayAvatarURL({
        dynamic: false,
        format: "png",
      });

      let img = await new DIG.Delete().getImage(avatar);

      let attach = new Discord.MessageAttachment(img, "delete.png");
      message.channel.send(attach);
    } else {
      const user = message.mentions.users.first();

      let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });

      let img = await new DIG.Delete().getImage(avatar);

      let attach = new Discord.MessageAttachment(img, "delete.png");
      message.channel.send(attach);
    }
  },
};