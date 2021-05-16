if (query === "chatbot") {
  if (sb) {
    const chb = sb.Cbchannel;
    if (chb) {
      await setup.updateOne(
        {
          Guild: message.guild.id,
        },
        { $unset: { Cbchannel: "" } }
      );

      message.reply(
        `<a:sh_clap:839512083761987604> Chatbot has been disabled in this server`
      );
    } else {
      message.reply(`Chatbot is not enabled in this server`);
    }
  }
}
