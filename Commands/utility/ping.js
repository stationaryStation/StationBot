module.exports = {
  name: 'ping',
  description: 'Tells the User his ping with an embed',
  cooldown: 3,
  args: false,
  wip: false,
  execute(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Your current ping is ${timeTaken}ms`);
  },
};
