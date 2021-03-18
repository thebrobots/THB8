const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const { loadCommands } = require("./commandLoader");
const { TOKEN, PREFIX } = require("./util/sharkyUtil");


require("./util/eventLoader")(client);
require("./util/nqn")(client);
require("./util/muteHelper")(client);


client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

loadCommands(client);
