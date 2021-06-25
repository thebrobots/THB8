module.exports = async (guild) => {
  const setup = require("../../models/setup")
  
  await setup.findOneAndDelete({ Guild: guild.id})
  const cmdModel = require("../../models/cmd");

  await cmdModel.find({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await cmdModel
        .deleteMany({ Guild: guild.id })
    }
  });

  const levels = require("../../../node_modules/discord-xp/models/levels");

  await levels.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await levels
        .deleteMany({ guildID: guild.id })
    }
  });

  const msgModel = require("../../models/messages");

  await msgModel.find({ guildID: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      await msgModel
        .deleteMany({ guildID: guild.id })
    }
  });

  console.log(`server: ${guild} | action: leave | blacklisted: false | data: deleted`)
};
