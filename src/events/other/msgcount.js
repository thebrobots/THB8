module.exports = async (message) => {
  const Discord = require("discord.js");
  const request = require("node-superfetch");
  
  const msgModel = require("../../models/messages");
  const theuser = require("../../models/user");

  const ub = await theuser.findOne({ User: message.author.id });

  if (!ub) {
    const newUser = new theuser({
      User: message.author.id,
      Reps: 0,
      Messages: 0,
    });

    await newUser.save().catch((err) => console.log(err));
  }

  // messages counter per user
  if (ub) {
    const msg = ub.Messages;

    if (!msg) {
      ub.Messages = 1;
      await ub.save().catch((e) => console.log(`Failed to save new user.`));
    } else {
      ub.Messages += 1;

      await ub
        .save()
        .catch((e) => console.log(`Failed to save a member's messages: ${e}`));
    }
  }

  // user messages counter per guild
  const msgDoc = await msgModel.findOne({
    guildID: message.guild.id,
    memberID: message.author.id,
  });

  if (!msgDoc) {
    const newUser = new msgModel({
      guildID: message.guild.id,
      memberID: message.author.id,
      messages: 1,
    });

    await newUser.save().catch((e) => console.log(`Failed to save new user.`));
  } else {
    msgDoc.messages += 1;

    await msgDoc
      .save()
      .catch((e) => console.log(`Failed to save a member's messages: ${e}`));
  }

  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  // message reached achievement
  if (ub) {
    const msg = ub.Messages;
    if (msg) {
      if (msg === 100) {
        const { body } = await request.get(
          "https://ybf8-mcgen.herokuapp.com/a.php?i=19&h=Unlocked+Badge%21&t=Bronze+messager"
        );

        const attach = new Discord.MessageAttachment(body, "achievement.png");
        message.reply(attach);
      }

      if (msg === 500) {
        const { body } = await request.get(
          "https://ybf8-mcgen.herokuapp.com/a.php?i=22&h=Unlocked+Badge%21&t=Silver+messager"
        );

        const attach = new Discord.MessageAttachment(body, "achievement.png");
        message.reply(attach);
      }

      if (msg === 1000) {
        const { body } = await request.get(
          "https://ybf8-mcgen.herokuapp.com/a.php?i=23&h=Unlocked+Badge%21&t=Golden+messager"
        );

        const attach = new Discord.MessageAttachment(body, "achievement.png");
        message.reply(attach);
      }

      if (msg === 5000) {
        const { body } = await request.get(
          "https://ybf8-mcgen.herokuapp.com/a.php?i=2&h=Unlocked+Badge%21&t=Diamond+messager"
        );

        const attach = new Discord.MessageAttachment(body, "achievement.png");
        message.reply(attach);
      }
    }
  }
};
