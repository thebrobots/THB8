const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get your avatar or an user's",
  botPerms: ["EMBED_LINKS"],
  execute(client, message, args) {
    if (!message.mentions.users.size) {
      let newEmbed = new MessageEmbed()
        .setTitle("Your Avatar")
        .setURL(
          `${message.author.displayAvatarURL({
            size: 1024,
            dynamic: true,
            format: "png",
          })}`
        )
        .setImage(
          `${message.author.displayAvatarURL({
            size: 1024,
            dynamic: true,
            format: "png",
          })}`
        )
        .setColor("#ffe65d");
      message.channel.send(newEmbed);
    } else {
      const user = message.mentions.users.first();

      let newEmbed = new MessageEmbed()
        .setTitle(`${user.username}'s avatar`)
        .setURL(
          `${user.displayAvatarURL({
            size: 1024,
            dynamic: true,
            format: "png",
          })}`
        )
        .setImage(
          `${user.displayAvatarURL({
            size: 1024,
            dynamic: true,
            format: "png",
          })}`
        )
        .setColor("#ffe65d");
      message.channel.send(newEmbed);
    }
  },
};
