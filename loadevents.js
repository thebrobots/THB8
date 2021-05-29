const reqEvent = (event) => require(`./events/${event}`);
const Discord = require("discord.js");
module.exports = (client) => {
  const cooldowns = new Discord.Collection();
  const inVoice = new Discord.Collection();
  client.on("ready", () => reqEvent("ready")(client));
  client.on("message", (m) => reqEvent("message")(m, cooldowns));
  client.on("message", reqEvent("afk"));
  client.on("message", reqEvent("botmention"));
  client.on("guildCreate", reqEvent("guildCreate"));
  client.on("guildDelete", reqEvent("guildDelete"));
  client.on("guildMemberAdd", reqEvent("guildMemberAdd"));
  client.on("voiceStateUpdate", (os, ns) =>
    reqEvent("voiceStateUpdate")(os, ns, inVoice)
  );
  client.on("guildMemberRemove", reqEvent("guildMemberRemove"));

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
  client.on("unhandledRejection", console.error);
};
