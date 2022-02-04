module.exports = {
  name: 'changeavatar',
  description: 'Changes the avatar of the bot',
  args: true,
  usage: '<url>',
  cooldown: 180,
  wip: true,
  async execute(message, args, client) {
    // Create a async function called setPicture
    const picturePath = args[0];
    async function setPicture(picturePath) {
      await client.user
        .setAvatar(picturePath)
        .then(() => console.log('Avatar set!'));
    }
    const url = args.join(' ');
    if (!url || !picturePath) {
      message.channel.send("You didn't set an url!");
      return false;
    } else {
      try {
        setPicture(url);
      } catch (error) {
        message.channel.send(`\`\`\`${error}\`\`\``);
      }
    }
  },
};
