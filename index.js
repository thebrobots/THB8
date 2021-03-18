const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const { loadCommands } = require("./commandLoader");
const { TOKEN, PREFIX } = require("./util/sharkyUtil");
const fetch = require("node-fetch");

require("./util/eventLoader")(client);
require("./util/nqn")(client);
require("./util/muteHelper")(client);

const servers = client.guilds.cache.size
 
fetch('https://top.gg/api//bots/800074066949832714/stats', {
        method: 'post',
        server_count: JSON.stringify(servers),
        headers: { "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMDA3NDA2Njk0OTgzMjcxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE2MDk2NjgyfQ.xPq_ioJ14Xj2rvOfl-9qYxoDnUznBQ_ZYQMojFqw4PE" }

    })
    .then(res => res.json())
    .then(json => console.log(json));

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

loadCommands(client);
