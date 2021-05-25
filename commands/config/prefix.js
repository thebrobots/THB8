const setup = require("../../models/setup");

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  Description: "Change the server's prefix",
  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const prefix = await args.join(" ");

    if (!prefix)
      return message.channel.send("Please specify a prefix to change to.");

    const sb = await setup.findOne({
      Guild: message.guild.id,
    });

    const prf = sb.Prefix;

    if (prf) {
      sb.Prefix = prefix;
      await sb.save().catch((err) => console.log(err));

      return message.reply(`The prefix has been changed to \`${prefix}\` `);
    } else {
      sb.Prefix = prefix;
      await sb.save().catch((err) => console.log(err));

      return message.reply(`The prefix has been set to \`${prefix}\` `);
    }
  },
};
