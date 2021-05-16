const cpModel = require("../models/captcha");

const blDoc = await cpModel.findOne({
  Guild: member.guild.id,
});

if (blDoc) {
  const ch = blDoc.Channel;
  const channel = member.guild.channels.cache.get(ch);

  const rl = blDoc.Role;
  const role = member.guild.roles.cache.get(rl);

  const options = {
    size: 40,
    characters: 5,
    color: "#ffe65d",
  };
  const option = {
    color: "#f8dc50",
  };

  const captcha = new CaptchaGenerator();
  captcha.setDimension(50, 150);
  captcha.setCaptcha(options);
  captcha.setTrace(option);

  const buffer = await captcha.generate();
  let attach = new Discord.MessageAttachment(buffer, "captcha.png");

  const embed = new Discord.MessageEmbed()
    .setColor("#ffe65d")
    .setTitle(`Welcome to ${member.guild}`)
    .attachFiles(attach)
    .setDescription("Please type what you see on the captcha below")
    .addField(
      "Why this?",
      "This feature is made to protect the server against possible raiders ot\rautomated accounts"
    )
    .addField("Your captcha:", `\u200b`)
    .setImage("attachment://captcha.png");
  channel.send(embed);

  let collector = channel.createMessageCollector(
    (m) => m.author.id === member.id
  );
  collector.on("collect", (m) => {
    if (m.content.toUpperCase() === captcha.text)
      channel.send("Verified Successfully!").then(member.roles.add(role));
    else channel.send(`Not correct!`);
    collector.stop();
  });
}
