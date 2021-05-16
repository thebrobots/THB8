const Levels = require("discord-xp");
const Canvas = require("discord-canvas"),
Discord = require("discord.js");
const theuser = require("../../models/user");
const { MONGO_URL } = require("../../secured");

module.exports = {
  name: "rank",
  description: "Show your level card",
  async execute(client, message, args) {
    Levels.setURL(MONGO_URL);

    let target;
    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else {
      target = message.author;
    }

    const ub = await theuser.findOne({
      User: target.id,
    });

    let points;
    if (!ub) {
      points = 0;
    } else {
      points = ub.Reps;
    }

     let repBadges;

     if (points > 5 && points < 10) {
       repBadges = "bronze";
     } else if (points > 10 && points < 30) {
       repBadges = "silver";
     } else if (points > 30 && points < 50) {
       repBadges = "gold";
     } else if (points > "50") {
       repBadges = "diamond";
     }

    let messages;

    if (ub) {
      messages = ub.Messages;
    } else {
      messages = 0;
    }

    let msgBadges;

    if (messages > 100 && messages < 500) {
      msgBadges = "bronze";
    } else if (messages > 500 && messages < 1000) {
      msgBadges = "silver";
    } else if (messages > 1000 && messages < 5000) {
      msgBadges = "gold";
    } else if (messages > 5000) {
      msgBadges = "diamond";
    }

    const user = await Levels.fetch(target.id, message.guild.id, true);

    if (user) {
      
      const neededXP = Levels.xpFor(parseInt(user.level) + 1);

  

      let image = await new Canvas.RankCard()
        .setAddon("xp", true)
        .setAddon("rank", true)
        .setXP("current", user.xp)
        .setXP("needed", neededXP)
        .setBadge(1, msgBadges)
        .setBadge(6, repBadges)
        .setRank(user.position)
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(user.level)
        .setReputation(points)
        .setRankName("Your text here!")
        .setUsername(`${target.username}#${target.discriminator}`)
        .setBackground("https://i.imgur.com/YRlFuaY.png")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "rank.png"
      );

      message.channel.send(attachment);
    } else {
     

      let image = await new Canvas.RankCard()
        .setAddon("xp", true)
        .setAddon("rank", true)
        .setXP("current", 0)
        .setXP("needed", 100)
        .setBadge(1, msgBadges)
        .setBadge(6, repBadges)
        .setRank("0")
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(0)
        .setReputation(points)
        .setRankName("Your text here!")
        .setUsername(`${target.username}#${target.discriminator}`)
        .setBackground("https://i.imgur.com/YRlFuaY.png")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "rank.png"
      );

      message.channel.send(attachment);
    }
  },
};
