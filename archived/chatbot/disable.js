if (query === "captcha") {
  if (sb) {
    const cps = sb.Cpchannel;
    if (cps) {
      await setup.updateOne(
        {
          Guild: message.guild.id,
        },
        { $unset: { Cpchannel: "" } }
      );

      message.reply(
        `<a:sh_clap:839512083761987604> Captcha verification has been disabled in this server`
      );
    } else {
      message.reply(`Captcha verification is not enabled in this server`);
    }
  }
}
