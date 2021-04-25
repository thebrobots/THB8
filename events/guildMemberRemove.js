module.exports = async (member) => {
  const Levels = require("discord-xp");

  await Levels.deleteUser({ userId: member.id, guildId: member.guild.id });

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

  const repModel = require("../models/rep");

  await repModel.findOne(
    { guildID: member.guild.id, memberID: member.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        await repModel.findOneAndDelete({
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
