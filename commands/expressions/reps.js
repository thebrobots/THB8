const repModel = require("../../models/rep");
const Discord = require("discord.js");
module.exports = {
  name: "reputations",
  aliases: ["reps", "rep-points"],
  description: "See someone`s reputation points!",
  async execute(client, message, args) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();

    } else {
      user = message.author;
    }

    const repDoc = await repModel.findOne({
      guildID: message.guild.id,
      memberID: user.id,
    });

    let points;
    if (!repDoc) {
      points = 0;
    } else {
      points = repDoc.reps;
    }

    let rep = new Discord.MessageEmbed()
      .setTitle("<:sh_reps:816052337189322754> Reputation Points")
      .addField("User", `${user}`)
      .addField("Points", `${points}`)
      .setColor("#ffe65d")

    message.channel.send(rep);
  },
};
