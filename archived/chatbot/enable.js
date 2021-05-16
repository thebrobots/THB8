if (query === "chatbot") {
  const cb = sb.Cbchannel;

  if (cb) {
    sb.Cbchannel = channel;

    await sb.save().catch((err) => console.log(err));
    message.reply(
      `<a:sh_clap:839512083761987604> Chatbot has been moved to <#${channel}>`
    );
  } else {
    sb.Cbchannel = channel;

    await sb.save().catch((err) => console.log(err));
    message.reply(
      `<a:sh_clap:839512083761987604> Chatbot has been enabled in <#${channel}>`
    );
  }
}
