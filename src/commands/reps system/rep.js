const userDoc = require("../../models/user");

module.exports = {
  name: "rep",
  description: "Send someone a reputation point!",
  cooldown: 86400,
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  async execute(client, message, args) {
    const user = message.mentions.users.first();

    if (!user) {
      message.channel.send(
        "<:sh_reps:816052337189322754> Please mention someone!"
      );
    } else if (user.id === message.author.id) {
      return message.channel.send(
        `<:sh_reps:816052337189322754> You can't rep yourself!`
      );
    }

    const ub = await userDoc.findOne({
      User: user.id,
    });

    if (!ub) {
      const newUser = new userDoc({
        User: user.id,
        Reps: 1,
        Messages: 0,
      });

      await newUser
        .save()
        .catch((e) => console.log(`Failed to save new user.`));
    } else {
      ub.Reps += 1;

      await ub.save().catch((e) => console.log(`Failed to rep a member: ${e}`));
    }
    message.channel.send(
      `<:sh_reps:816052337189322754> **${message.author.username}** sent a reputation point to <@${user.id}>`
    );
  },
};
