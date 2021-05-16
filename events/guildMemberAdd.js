module.exports = async (member) => {
  const user = require("../models/user");
  const muteModel = require("../models/mute");

  const ub = await user.findOne({
    User: member.id,
  });

  if (!ub) {
    const newUser = new user({
      User: member.id,
      Reps: 0,
      Messages: 0,
    });

    await newUser.save().catch((e) => console.log(`Failed to save new user.`));
  }

  const muteDoc = await muteModel.findOne({
    guildID: member.guild.id,
    memberID: member.id,
  });

  if (muteDoc) {
    const muteRole = member.guild.roles.cache.find((r) => r.name == "Muted");

    if (muteRole)
      member.roles.add(muteRole.id).catch((err) => console.log(err));

    muteDoc.memberRoles = [];

    await muteDoc.save().catch((err) => console.log(err));
  }
};
