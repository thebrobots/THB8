module.exports = async (member) => {
  const levels = require("../node_modules/discord-xp/models/levels");

  await levels.findOne(
    { userID: member.id, guildID: member.guild.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        await levels.findOneAndDelete({
          userID: member.id,
          guildID: member.guild.id,
        });
      }
    }
  );

  const muteModel = require("../models/mute");

  await muteModel.findOne(
    { guildID: member.guild.id, memberID: member.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        await muteModel.findOneAndDelete({
          guildID: member.guild.id,
          memberID: member.id,
        });
      }
    }
  );

  const warnModel = require("../models/warn");

  await warnModel.find(
    { guildID: member.guild.id, memberID: member.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        await warnModel.deleteMany({
          guildID: member.guild.id,
          memberID: member.id,
        });
      }
    }
  );

  const msgModel = require("../models/messages");

  await msgModel.findOne(
    { guildID: member.guild.id, memberID: member.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        await msgModel.findOneAndDelete({
          guildID: member.guild.id,
          memberID: member.id,
        });
      }
    }
  );
};
