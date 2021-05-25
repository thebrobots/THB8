const cmdModel = require("../../models/nocmd");
const setup = require("../../models/setup");

module.exports = {
  name: "enable",
  description:
    "Enable functions like suggestions or commands previously disabled",
  subcommands: "channel, command, logs",

  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const type = args[0]?.toLowerCase();
    const input = args.slice(1).join(" ");
    const query = input.toLowerCase();

    const channels = message.mentions.channels.first() || message.channel;
    const channel = channels.id;

    const sb = await setup.findOne({
      Guild: message.guild.id,
    });

    if (type === "channel") {
      if (!query) {
        return message.reply(
          "Please type the type of channel you want to set (level up, suggestions...)"
        );
      }

      if (query === "levelup") {
        const lvlup = sb.Lvlchannel;

        if (lvlup) {
          sb.Lvlchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Level up message has been moved to <#${channel}>`
          );
        } else {
          sb.Lvlchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Level up message has been enabled in <#${channel}>`
          );
        }
      }

      if (query === "suggestions") {
        const sgs = sb.Sgchannel

        if (sgs) {
          sb.Sgchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Suggestions have been moved to <#${channel}>`
          );
        } else {
         sb.Sgchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Suggestions have been enabled in <#${channel}>`
          );
        }
      }

      if (query === "logs") {
        const logged = sb.Sgchannel

        if (logged) {
          sb.Logchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Logs have been moved to <#${channel}>`
          );
        } else {
          sb.Logchannel = channel;

          await sb.save().catch((err) => console.log(err));
          message.reply(
            `<a:sh_clap:839512083761987604> Logs have been enabled in <#${channel}>`
          );
        }
      }
    }

    if (type === "command") {
      if (!query) {
        return message.reply("Please type the command you want to enable");
      }

      const { commands } = message.client;

      const command =
        commands.get(query) ||
        commands.find((c) => c.aliases && c.aliases.includes(query));

      if (!command) {
        return message.reply("that's not a valid command!");
      }

      const cmDoc = await cmdModel.findOne({
        Guild: message.guild.id,
        Command: query,
      });

      if (cmDoc) {
        await cmdModel.findOneAndDelete({
          Guild: message.guild.id,
          Command: query,
        });

        message.reply(
          `<a:sh_clap:839512083761987604> The command \`${query}\` has been enabled!`
        );
      } else {
        return message.reply("That command is not disabled!");
      }
    }
  },
};
