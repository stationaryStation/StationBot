const Discord = require('discord.js')
module.exports = {
  name: 'ping',
  description: 'Tells the User his ping with an embed',
  cooldown: 3,
  args: false,
  wip: false,
  execute(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    const pingEmbed = new Discord.MessageEmbed()
      .setTitle('Ping')
      .setDescription(`Your current ping is ${timeTaken}ms`);

    message.reply({embed: pingEmbed});
  },
};
