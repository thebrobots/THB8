const cmdModel = require("../../models/ccommands");

module.exports = {
  name: "cc-create",
  aliases: ["ccc"],
  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.reply(
        "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
      );

    const name = args[0].toLowerCase();
    const response = args.slice(1).join(" ");
    const regex = /^([A-Z0-9])*$/gi
    
    if (!name) return message.reply("Please specify a command name");
    if (!response) return message.reply("Please specify a response");
    
    if(name.length > 30) return message.reply('Woah! Thats too long. Try again with something shorter')
    if(response.length > 2000) return message.reply('Woah! Thats too long. Try again with something shorter')
    
    if(regex.test(name) === false) return message.reply('Please type normal letters, I\'m not a robot :/')
    
    const data = await cmdModel.findOne({
      Guild: message.guild.id,
      Command: name,
    });

    if (data)
      return message.channel.send("This custom command already exists!");

    const newData = new cmdModel({
      Guild: message.guild.id,
      Command: name,
      Response: response,
    });
    await newData.save();
    message.channel.send(`Saved **${name}** as a custom command!`);
  },
};
