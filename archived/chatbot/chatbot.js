module.exports = async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const { chatBot } = require("reconlx");
  const cbModel = require("../../models/chatbot");

  await cbModel.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return;
    if (message.channel.id !== data.Channel) return;
    chatBot(message, message.channel, message.author.id);
  });
};
