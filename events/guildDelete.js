module.exports = async (guild) => {
  const prefixModel = require("../models/prefix");

  await prefixModel.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await prefixModel
        .findOneAndDelete({ Guild: guild.id })
    }
  });

  const cmdModel = require("../models/ccommands");

  await cmdModel.find({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await cmdModel
        .deleteMany({ Guild: guild.id })
    }
  });

  const levels = require("../node_modules/discord-xp/models/levels");

  await levels.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await levels
        .deleteMany({ guildID: guild.id })
    }
  });

  const msgModel = require("../models/messages");

  await msgModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await msgModel
        .deleteMany({ guildID: guild.id })
    }
  });

  const warnModel = require("../models/warn");

  await warnModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await warnModel
        .deleteMany({ guildID: guild.id })
    }
  });

  const repModel = require("../models/rep");

  await repModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await repModel
        .deleteMany({ guildID: guild.id })
    }
  });

  const muteModel = require("../models/mute");

  await muteModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await muteModel
        .deleteMany({ guildID: guild.id })
    }
  });

  const { Table } = require("console-table-printer");
  const p = new Table();
  p.addRow(
    { server: guild, action: "leave", blacklisted: 'false', data: "Deleted" },
    { color: "red" }
  );

  p.printTable();
};
