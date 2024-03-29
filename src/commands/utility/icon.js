const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "icon",
  description: "Sends the current server's icon.",
  aliases: ["server-icon", "guild-icon"],
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    if (!message.guild.available)
      return this.client.logger.info(
        `Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`
      );

    const embed = new MessageEmbed()
      .setColor("#ffe65d")
      .setTitle(`Icon of ${message.guild.name}`)
      .setImage(
        `${message.guild.iconURL({ size: 1024, dynamic: true, format: "png" })}`
      );
    message.channel.send({ embed });
  },
};
