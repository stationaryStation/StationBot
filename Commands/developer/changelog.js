const Discord = require('discord.js');
module.exports = {
  name: 'changelog',
  description:
    'List\'s all the changes made to the bot in "x" update.',
  args: false,
  cooldown: 10,
  wip: false,
  // eslint-disable-next-line no-unused-vars
  execute(message, botVer) {
    const changelog = new Discord.MessageEmbed()
      .setColor('#FF0057')
      .setTitle('Changelog')
      .setAuthor(
        `stationBot ${botVer}`,
        'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png',
      )
      .setDescription('1.2.5 alpha')
      .addFields(
        {
          name: 'More commands!',
          value:
            'I havent updated StationBot in a while now, and I wanted to add more commands so I added a fun one! (st:say)',
        },
        {
          name: 'Bugs deleted',
          value:
            'I squatched a lot of bugs a long time ago and this update is no exeption.',
        },
        {
          name: 'Comments! Loads of them!',
          value:
            'Hopefully, development will be a lot easier since the documentation webpage is still on the works',
        },
      )
      .setThumbnail(
        'https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png',
      );
    message.channel.send(changelog);
  },
};
