const { MessageEmbed } = require("discord.js");
const cmdModel = require("../../models/ccommands");

module.exports = {
  name: "cc-list",
  aliases: ["ccl"],
  async execute(client, message, args) {
    const data = await cmdModel.find({ Guild: message.guild.id });

    if (!!data === false)
      return message.channel.send("There are no custom commands!");
    message.channel.send(
      new MessageEmbed()
        .setTitle(`${message.guild.name}'s custom commands`)
        .setColor("#ffe65d")
        .setDescription(
          data.map((cmd, i) => `${i + 1}: ${cmd.Command}`).join("\n")
        )
    );
  },
};
