module.exports = {
  name: 'pootify',
  args: false,
  description: 'Changes your name to pootis',
  execute(message) {
    const nick = 'pootis'; // add nick as pootis
    try {
      message.member.setNickname(nick); // change the message author's nick to pootis
    } catch (error) {
      message.channel.send(
        `Error while changing nickname:\n\`\`\`${error}\`\`\``,
      );
    }
  },
};
