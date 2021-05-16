const Discord = require("discord.js");

module.exports = {
  name: "change-log",
  description: "Send the latest update details",
  async execute(client, message, args) {
    let newEmbed = new Discord.MessageEmbed()
      .setColor("#ffe65d")
      .setTitle(
        `<:sh_alarm:816052378075791401> UPDATE 16/05/21 <:sh_alarm:816052378075791401>`
      )
      .setDescription(
        "These are the new features implemented on today's update"
      )
      .addField(
        "Music :/",
        "The music is still not working. We are trying to fix it as soon as possible"
      )
      .addField("New image/gif command", "Added the command `petpat` try it ;)")
      .addField(
        "No more unorganized servers",
        "you don't want to have nsfw commands on your server? Now use `enable` and `disable` commands to disable or enable commands!"
      )
      .addField(
        "Suggestions",
        "Implemented suggestions system! Use `enable channel suggestions` command to set the channel where the suggestions will be sent and `suggest [your text]` to suggest something"
      )
      .addField(
        "Global data",
        "Now we made that the badges you get on your `rank`card will be global, no per guild."
      )
      .addField(
        "Reputation",
        "Now the reputation points will be counted globally, so the reps in your rank card are the total you have. Lead yourself to the top! *We also added a reputaion badge*"
      )
      .addField(
        "Ban and unban commands",
        "At the end, after 99274792274979 years, we fixed the ban and unan commands :)"
      )
      .addField(
        "Bot related commands",
        "The `bug-report` and `bot-suggest` commands have both been renamed to `bot suggest` and `bot report`"
      )
      .addField("Enable and disable", "We added `enable` and `disable` commands so you can now choose what happens in your server. You can enable or disable suggestions, levelup and commands. (also logs but the bot will not do anything bc We didn't finish them ,:)")
      .addField(`Stay tuned for next updates!!!`, `\u200b`)
      .setFooter("att: elttayman");
    message.channel.send(newEmbed);
  },
};
