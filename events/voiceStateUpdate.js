module.exports = async (oldState, newState, inVoice) => {
  let oldUserChannel = oldState.channelID;
  let newUserChannel = newState.channelID;

  const Discord = require('discord.js')
  const request = require("node-superfetch");
  const { MONGO_URL } = require("../util/sharkyUtil");
  
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
            const cbModel = require("../models/levelup");
        
            const blDoc = await cbModel.findOne({
              Guild: member.guild.id,
            });
            if(blDoc) {
            const ch = blDoc.Channel;
            const channel = message.guild.channels.cache.get(ch);
            const user = await Levels.fetch(newState.member.id, newState.guild.id);
            const { body } = await request.get(
              `https://ybf8-mcgen.herokuapp.com/a.php?i=40&h=Level+up%21&t=${newState.member.username}+is+now+level+${user.level}%21`
            );
        
            const attach = new Discord.MessageAttachment(body, "levelUp.png");
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