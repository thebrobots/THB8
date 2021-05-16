const Discord = require("discord.js");
const setup = require('../../models/setup')

module.exports = {
  name: "suggest",
  description: "Sends a suggestion",
  cooldown: 15,
  async execute(client, message, args) {

    if (!args) {
      return message.channel.send(
        "<:sh_wait:817144214667132949> You have to write the content of the suggestion!"
      );
    }
    const sgs = args.join(" ");

    const sb = await setup.findOne({
      Guild: message.guild.id,
    });

    if(!sb){
        return message.reply('Ups! This servver doesn\'t have the suggestions enabled. Use `enable channel suggestions @channel` to enable them')
    }

    const id = sb.Sgchannel
    const channel = client.channels.cache.get(id);


    let webhook = await channel.fetchWebhooks();
    webhook = webhook.find((x) => x.name === "suggestions");

    if (!webhook) {
      webhook = await channel.createWebhook(`suggestions`, {
        avatar: client.user.displayAvatarURL({ dynamic: true }),
      });
    }

    let avatar = message.author.displayAvatarURL({ dynamic: true, format: 'png' });

    await webhook.edit({
      name: message.member.nickname
        ? message.member.nickname
        : message.author.username,
      avatar: avatar
    });

     const embed = new Discord.MessageEmbed()
       .setTitle("Suggestion")
       .setColor("#FFE65D")
       .setDescription(sgs)
       .setTimestamp(new Date());

     await webhook.send({
       embeds: [embed],
     }).then(async msg => {
         await msg.react("<a:sh_tick:839246186112352338>"); 
         await msg.react('<a:sh_cross:839243779705667634>')
        })

    
    await webhook.edit({
      name: `suggestions`,
      avatar: client.user.displayAvatarURL({ dynamic: true }),
    });

    return message.react("<a:sh_tick:839246186112352338>");
  },
};
