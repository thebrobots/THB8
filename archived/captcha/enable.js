if (query === "captcha") {
  const verify = sb.Cpchannel;

  if (verify) {
    sb.Cpchannel = channel;

    await sb.save().catch((err) => console.log(err));
    message.reply(
      `<a:sh_clap:839512083761987604> Captcha verification has been moved to <#${channel}>`
    );
  } else {
    sb.Cpchannel = channel;

    await sb.save().catch((err) => console.log(err));
    message.reply(
      `<a:sh_clap:839512083761987604> Captcha verification has been enabled in <#${channel}>`
    );
  }
}
