const { Client, Collection, Intents} = require("discord.js");
const client = new Client({ 
    allowedMentions: { parse: ["users", "roles"] },
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_PRESENCES]
});

const { loadCommands } = require("./loadcmds");
const { TOKEN, PREFIX } = require("./secured");

require("./loadevents")(client);
require("./utilities/emojis")(client);
require("./utilities/checkmute")(client);

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

loadCommands(client);
