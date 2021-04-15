const Discord = require('discord.js')
const levelModel = require("../../models/levelup");

module.exports = {
name: 'disablechannel',
description: 'disable a previous set channel (welcome, levelup...)',

async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send(
      "Eeeh wait! You can't use that command <a:sh_perms:799392392654225408>"
    );
    
    const query = args[0]?.toLowerCase();

    const cbDoc = await levelModel.findOne({
        Guild: message.guild.id,
      });

    if(!query){
        return message.reply('Please type the type of channel you want to disable (level up only)')
    }
    if(query === 'levelup'){
    

        if (cbDoc) {
            await levelModel.findOneAndDelete({
              Guild: message.guild.id,
            });
    
            message.reply(`Level up channel has been disabled in this server`);
          } else {
            
            message.reply(`Level up channel is not enabled in this server`);
          }
    }
}
}