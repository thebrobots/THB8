const Discord = require("discord.js");

module.exports = {
  name: "change-log",
  description: "Send the latest update details",
  async execute(client, message, args) {
    let newEmbed = new Discord.MessageEmbed()
      .setColor("#ffe65d")
      .setTitle(
        `<:sh_alarm:816052378075791401> UPDATE 25/04/21 <:sh_alarm:816052378075791401>`
      )
      .setDescription(
        "These are the new features implemented on today's update"
      )
      .addField(
        "Music :/",
        "The music is still not working. We are trying to fix it as soon as possible"
      )
      .addField(
        "Bunch more image commands",
        "We fixed rank card, expression/action commands and a bug that makes the bot send a nsfw attention without any reason"
      )
      .addField(
        "No more annoying messages",
        "We implemented `setchannel` and `disablechannel` commands sso if you want the level up messages go to a specific channel, you now can do it"
      )
      .addField(`Stay tuned for next updates!!!`, `\u200b`)
      .setFooter("att: elttayman");
    message.channel.send(newEmbed);
  },
};
