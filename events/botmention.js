module.exports = async (message) => {
  
  if (message.author.bot) return;
  if (!message.guild) return;
  
  //nmentioned bot
  if (message.content.startsWith(`<@800074066949832714>`)) {
    return message.channel.send(
      `My prefix in this server is \`${p}\`\n\nTo get a list of commands, type \`${p}help\``
    );
  }
}
