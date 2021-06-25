const discord = require("discord.js");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    let substringArray = get_substrings_between(message.content, ":", ":");
    let msg = message.content;
    if (!substringArray.length) return;

    substringArray.forEach((m) => {
      let emoji = client.emojis.cache.find((x) => x.name === m);
      var replace = `:${m}:`;
      var rexreplace = new RegExp(replace, "g");

      if (
        emoji &&
        !msg.split(" ").find((x) => x === emoji.toString()) &&
        !msg.includes(`<a${replace}${emoji.id}>`)
      )
        msg = msg.replace(rexreplace, emoji.toString());
    });

    if (msg === message.content) return;
    
    if (!message.guild.me.permissionsIn(message.channel).has("MANAGE_MESSAGES")) {
      return message.reply('Ups! I need `MANAGE_MESSAGES` permission in order to use the emojis :/')
    }
    else if(!message.guild.me.permissionsIn(message.channel).has("MANAGE_WEBHOOKS")) {
      return message.channel.send("Ups! I need `MANAGE_WEBHOOKS` permission in order to use the emojis :/");
    }
    
    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find((x) => x.name === "emojis");

    if (!webhook) {
      webhook = await message.channel.createWebhook(`emojis`, {
        avatar: client.user.displayAvatarURL({ format: "png" }),
      });
    }

    await webhook.edit({
      name: message.member.nickname
        ? message.member.nickname
        : message.author.username,
      avatar: message.author.displayAvatarURL({ format: "png" }),
    });

    message.delete().catch((m) => {});

    webhook.send(msg).catch((m) => {});

    await webhook.edit({
      name: `emojis`,
      avatar: client.user.displayAvatarURL({ format: "png" }),
    });
  });

  function get_substrings_between(str, startDelimiter, endDelimiter) {
    var contents = [];
    var startDelimiterLength = startDelimiter.length;
    var endDelimiterLength = endDelimiter.length;
    var startFrom = (contentStart = contentEnd = 0);

    while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
      contentStart += startDelimiterLength;
      contentEnd = strpos(str, endDelimiter, contentStart);
      if (false === contentEnd) {
        break;
      }
      contents.push(str.substr(contentStart, contentEnd - contentStart));
      startFrom = contentEnd + endDelimiterLength;
    }

    return contents;
  }

  function strpos(haystack, needle, offset) {
    var i = (haystack + "").indexOf(needle, offset || 0);
    return i === -1 ? false : i;
  }
};
