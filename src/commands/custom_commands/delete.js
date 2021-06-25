const cmdModel = require("../../models/cmd");

module.exports = {
  name: "cc-delete",
  aliases: ["ccd"],
  userPerms: ["MANAGE_GUILD"],
  async execute(client, message, args) {
    const name = args[0];

    if (!name) return message.channel.send("Please specify a command name");

    const data = await cmdModel.findOne({
      Guild: message.guild.id,
      Command: name,
    });

    if (!data)
      return message.channel.send("That custom command does not exist!");

    await cmdModel.findOneAndDelete({ Guild: message.guild.id, Command: name });
    message.channel.send(`Removed **${name}** from custom commands!`);
  },
};
