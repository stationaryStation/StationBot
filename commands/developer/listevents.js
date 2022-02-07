const fs = require('fs');
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

module.exports = {
  name: 'listevents',
  description: "List's all locally loaded stEvents",
  cooldown: 10,
  wip: true,
  execute(message) {
    message.channel.send('Loaded Events:');
    for (const file of eventFiles) {
      message.channel.send(`./events/${file}`);
    }
  },
};
