const Discord = require("discord.js");
const cpModel = require("../../models/captcha");
const { PREFIX } = require("../../util/sharkyUtil");
const prefixModel = require("../../models/prefix");

module.exports = {
  name: "verification",
  description: "Enable/disable captcha verification on the server",
  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const data = await prefixModel
      .findOne({ Guild: message.guild.id })
      .catch((err) => console.log(err));

    let pr;
    if (data) {
      pr = data.Prefix;
    } else {
      pr = PREFIX;
    }

    const query = args[0]?.toLowerCase();

    const blDoc = await cpModel.findOne({
      Guild: message.guild.id,
    });

    if (query === "enable") {
      const channell = message.mentions.channels.first();

      const rolee = message.mentions.roles.first();

      if (!channell || !rolee) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Usage")
          .setDescription(
            `Correct usage of the command: \`${pr}captcha enable #channel @verificated_role\``
          )
          .setColor("#FF65ed");
        message.channel.send(embed);
      }

      const channel = channell.id;

      const role = rolee.id;

      if (blDoc) {
        await cpModel.findOneAndDelete({
          Guild: message.guild.id,
        });

        let newDoc = new cpModel({
          Guild: message.guild.id,
          Channel: channel,
          Role: role,
        });
        await newDoc.save().catch((err) => console.log(err));
        message.reply(`Captcha has been moved to <#${channel}>`);
      } else {
        let newDoc = new cpModel({
          Guild: message.guild.id,
          Channel: channel,
          Role: role,
        });
        await newDoc.save().catch((err) => console.log(err));
        message.reply(`Captcha has been enabled in <#${channel}>`);
      }
    }

    if (query === "disable") {
      if (blDoc) {
        await cpModel.findOneAndDelete({
          Guild: message.guild.id,
        });

        message.reply(`Captcha has been disabled in this server`);
      } else {
        message.reply(`Captcha is not enabled in this server`);
      }
    }

    if(query === 'retry') {
        
    }
  },
};
