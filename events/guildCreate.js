const setup = require('../models/setup') 
const { PREFIX } = require("../secured");
const { MessageEmbed } = require("discord.js");

module.exports = async (guild) => {

  const sb = new setup({
    Guild: guild.id,
    Prefix: 't/',
    Pruning: false,
  })

  await sb.save().catch((err) => console.log(err));

  var channel = guild.channels.cache
    .filter((chx) => chx.type === "text")
    .find((x) => x.position === 0);
  let newEmbed = new MessageEmbed()
    .setColor("#ffe65d")
    .setTitle(
      "Thanks for inviting me into this server <a:sh_like:812742588439593000>"
    )
    .setURL("")
    .setDescription(
      `- My default prefix is \`${PREFIX}\`\r\n\r\n- To change my prefix type \`${PREFIX}prefix <prefix>\`\r\n\r\n- Type \`${PREFIX}help\` to get a list of avaliable commands\r\n\r\n- Feel free to join our support server if you need help [Click here!!](https://discord.com/invite/J8RNPvsKPc)`
    )
    .setImage("")
    .setFooter("");
  channel.send(newEmbed);

 console.log(
   `server: ${guild} | action: join | blacklisted: false | data: created`
 );
};
