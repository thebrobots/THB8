const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const { loadCommands } = require("./commandLoader");
const { TOKEN, PREFIX } = require("./util/sharkyUtil");
const express = require("express");

require("./util/eventLoader")(client);
require("./util/nqn")(client);
require("./util/muteHelper")(client);


 
fetch('https://top.gg/api//bots/800074066949832714/stats', {
        method: 'post',
        server_count: client.guilds.cache.size,
 
    })
    .then(res => res.json())
    .then(json => console.log(json));

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

loadCommands(client);
