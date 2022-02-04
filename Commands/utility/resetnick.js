module.exports = {
  name: 'resetnick',
  args: false,
  description: 'Resets your nickname',
  cooldown: 20,
  wip: false,
  // eslint-disable-next-line no-unused-vars
  execute(message, args) {
    const nick = message.author;
    message.member.setNickname(nick);
  },
};
