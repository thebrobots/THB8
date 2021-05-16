const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
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
