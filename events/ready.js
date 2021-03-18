const chalk = require("chalk");
const mongoose = require("mongoose");
const { MONGO_URL } = require("../util/sharkyUtil");
 const fetch = require("node-fetch");

module.exports = (client) => {
  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let statuses = [
    `@YHF8 | ${client.guilds.cache.size} servers 🎉`,
    `@YHF8 | ${allMembers.size} members 🥂`,
    
  ];
  let index = 0;
  let nums = [0, 1];
  setInterval(() => {
    client.user.setActivity(statuses[index], { type: "WATCHING" });
    index = nums[index + 1] ? index + 1 : 0;
  }, 30000);

  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);

  console.log(
    chalk.bgYellowBright.black(
      ` ${client.user.username} online and ready to serve ${client.guilds.cache.size} servers! `
    )
  );

  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log(chalk.bgRedBright.black(` YHF8 connected to Mongo DB! `)))
    .catch((err) =>
      console.log(chalk.bgRed.black(` Unable to connect to Mongo DB! `))
    );
  
 
fetch('https://top.gg/api//bots/800074066949832714/stats', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMDA3NDA2Njk0OTgzMjcxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE2MDk2NjgyfQ.xPq_ioJ14Xj2rvOfl-9qYxoDnUznBQ_ZYQMojFqw4PE" }, 
        body: JSON.stringify({ "server_count": client.guilds.cache.size }),
    })
    .then(res => res.json())
    .then(json => console.log(json)).then(console.log('posted'))
    
};
