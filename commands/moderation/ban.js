const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a member from the server",
  usage: "<member> <reason>",
  async execute(client, message, args) {
    let target;
    if (message.mentions.members.first()) {
      target = client.users.cache.get(message.mentions.members.first().id);
    } else {
      target = client.users.cache.get(args[0]);
    }

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    } else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("I don't have permissions to ban members");
    } else if (!target) {
      return message.channel.send("Please mention someone!");
    } else if (target.id === message.author.id) {
      return message.channel.send("I can't let you self-harm");
    } else if (target.id === `521311050193436682`) {
      return message.channel.send(
        "Don't touch my dad <a:sh_daddy:799392400735862825>"
      );
    } else if (target.id === `${message.client.user.id}`) {
      return message.channel.send(
        "Rlly trying to make me ban myself!? hipocrite"
      );
    }

    const allBans = await message.guild.fetchBans();

    if (allBans.get(target.id)) {
      return message.channel.send("This member is alredy banned!");
    }

    const memberTarget = message.guild.members.cache.get(target.id);

    if (memberTarget) {
      const mentionedPosition = memberTarget.roles.highest.position;
      const memberPosition = message.member.roles.highest.position;
      const clientPosition = message.guild.me.roles.highest.position;

      if (memberPosition <= mentionedPosition) {
        return message.channel.send(
          "You can't ban that member beacuse his highest role is equal/higher than yours"
        );
      } else if (clientPosition <= mentionedPosition) {
        return message.channel.send(
          "I can't ban that member beacuse his highest role is equal/higher than mine"
        );
      }
    }

    const reason = args.slice(1).join(" ");

    message.guild.members.ban(target.id, { reason: reason });

    let newEmbed = new MessageEmbed()
      .setColor("#e96969")
      .setDescription(
        `${target.username} has been banned! ${
          reason ? `Reason: ${reason}` : ""
        }`
      );
    message.reply(newEmbed);
  },
};
