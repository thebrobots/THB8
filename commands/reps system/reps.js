const userDoc = require("../../models/user");
const Discord = require("discord.js");

module.exports = {
  name: "reps",
  description: "See someone`s reputation points!",
  async execute(client, message, args) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    const ub = await userDoc.findOne({
      User: user.id,
    });

    let points;
    if (!ub) {
      points = 0;
    } else {
      points = ub.Reps;
    }

    let rep = new Discord.MessageEmbed()
      .setTitle("<:sh_reps:816052337189322754> Reputation Points")
      .addField("User", `${user}`)
      .addField("Points", `${points}`)
      .setColor("#ffe65d");

    message.channel.send(rep);
  },
};
