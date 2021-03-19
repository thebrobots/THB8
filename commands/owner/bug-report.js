const Discord = require('discord.js')

module.exports = {
    name: 'bug-report',
    description: 'Sends a bug report directly to the devs',
    cooldown: 15, 
    async execute(client, message, args) {
      try {

        const sgs = args.join(" ");
       
        const channel = client.channels.cache.get('814969700861739059')

        const webhooks = await channel.fetchWebhooks();
		    const webhook = webhooks.first();

        const embed = new Discord.MessageEmbed()
        .setTitle('Bug report')
        .setColor('#FFE65D')
        .setDescription(sgs)
        .setFooter(`server: ${message.guild.name}`)
        .setTimestamp(new Date())


		    await webhook.send({
			  username: message.author.username,
			  avatarURL: message.author.displayAvatarURL({ dynamic: true }),
			  embeds: [embed],
		});
  
        return message.channel.send('The report has been sent! thanks ;)');
      } catch (err) {
        console.log(err);
        return message.reply(`Oh no, an error occurred. Try again later!`);
      }
    }
  };
  