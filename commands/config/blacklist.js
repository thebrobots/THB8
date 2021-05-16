const Discord = require("discord.js");
const blModel = require("../../models/guard");
module.exports = {
  name: "blacklist",
  aliases: ["blackl"],
  description: "Blacklist words on the server",
  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const query = args[0]?.toLowerCase();

    const word = args[0]?.toLoweCase();

    const blDoc = await blModel.findOne({
      Guild: message.guild.id,
    });

    if (query === "add") {
        if(blDoc){

        }
    }
  },
};
