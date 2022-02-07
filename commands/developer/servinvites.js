module.exports = {
  name: 'servinvites',
  description: 'Lists all server invites',
  args: false,
  execute(message) {
    message.guild
      .fetchInvites()
      .then((invites) => {
        message.channel.send(`Created Invites: ${invites.size}`);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  },
};
