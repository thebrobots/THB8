module.exports = async (member) => {
  const user = require("../../models/user");

  const ub = await user.findOne({
    User: member.id,
  });

  if (!ub) {
    const newUser = new user({
      User: member.id,
      Reps: 0,
      Messages: 0,
    });

    await newUser.save().catch((e) => console.log(`Failed to save new user.`));
  }
};
