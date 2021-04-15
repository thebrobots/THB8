const Discord = require('discord.js')
const levelModel = require("../../models/levelup");

module.exports = {
name: 'setchannel',
description: 'Set the channel for level up, welcome...',

async execute(client, message, args) {

    if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send(
      "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
    );
    
    const query = args[0]?.toLowerCase();
    const channels = message.mentions.channels.first() || message.channel;

    const cbDoc = await levelModel.findOne({
        Guild: message.guild.id,
      });

    if(!query){
        return message.reply('Please type the type of channel you want to set (level up only)')
    }
    if(query === 'levelup'){
    
        const channel = channels.id;

        if (cbDoc) {
            await levelModel.findOneAndDelete({
              Guild: message.guild.id,
            });
    
            let newDoc = new levelModel({
              Guild: message.guild.id,
              Channel: channel,
            });
    
            await newDoc.save().catch((err) => console.log(err));
            message.reply(`Level up message has been moved to <#${channel}>`);
          } else {
            let newDoc = new levelModel({
              Guild: message.guild.id,
              Channel: channel,
            });
    
            await newDoc.save().catch((err) => console.log(err));
            message.reply(`Level up message has been enabled in <#${channel}>`);
          }
    }
}
}