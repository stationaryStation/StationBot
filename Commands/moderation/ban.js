module.exports = {
  name: 'ban',
  description: 'Bans the mentioned user',
  args: true,
  usage: '<user>',
  cooldown: 10,
  wip: false,
  execute(message) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban('Someone was banned using st!ban')
          .then(() => {
            message.reply(`Successfully ban ${user.tag} `);
          })
          .catch((err) => {
            message.reply(
              `Failed to ban ${user.tag}. Do i got the necessary permissions?`,
            );
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  },
};
