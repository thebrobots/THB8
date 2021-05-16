module.exports = async (oldState, newState, inVoice) => {
  let oldUserChannel = oldState.channelID;
  let newUserChannel = newState.channelID;

  if(newState.member.bot) return;


  const Discord = require('discord.js')
  const request = require("node-superfetch");
  const { MONGO_URL } = require("../secured");
  
  const Levels = require("discord-xp");
  Levels.setURL(MONGO_URL);

  const Xp = 30;
  if(!oldUserChannel && newUserChannel){
    let i = setInterval(async () => {
      const hasLeveledUp = await Levels.appendXp(
          newState.member.id,
          newState.guild.id,
          Xp
        )

        if (hasLeveledUp) {
            const setup = require("../models/setup");
        
            const sb = await setup.findOne({
              Guild: newState.guild.id,
            });

            if(sb) {
            const ch = sb.Lvlchannel;
            const channel = newState.guild.channels.cache.get(ch);

            if(!channel) return;

            const user = await Levels.fetch(newState.member.id, newState.guild.id);
            const { body } = await request.get(
              `https://ybf8-mcgen.herokuapp.com/a.php?i=40&h=Level+up%21&t=${newState.member.username}+is+now+level+${user.level}%21+`
            );
        
            const attach = new Discord.MessageAttachment(body, "levelup.png");
            channel.send(attach);
        }
      }
    }, 30000)
    inVoice.set(oldState.id, i);
  }
  else if(oldUserChannel && !newUserChannel){
    clearInterval(inVoice.get(oldState.id));
    inVoice.delete(oldState.id);
  }
};