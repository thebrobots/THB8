const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages from the chat",
  aliases: ["cl"],
  async execute(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );
    }

    if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send(
        "I need `MANAGE_MESSAGES`permissions to run this command!"
      );
    }

    if (!args[0])
      return message.channel.send("Please type a number of messages to delete");
    if (isNaN(args[0])) return message.channel.send("Type a **number**!");

    if (args[0] > 100)
      return message.channel.send(
        "You can only delete a maximum of 100 messages at time!"
      );
    if (args[0] < 1)
      return message.channel.send("Type a number from 1 to 100!");

    await message.delete();
    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      });

    message.channel
      .send(
        `<a:sh_wash:840936684954845205> Correctly clean **${args[0]}** messages!`
      )
      .then((r) => r.delete({ timeout: 5000 }));
  },
};
