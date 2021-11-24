const Discord = require('discord.js')
module.exports = {
  name: 'changelog',
  description: 'List\'s all the changes made to the bot in "x" update.',
  args: false,
  cooldown: 10,
  wip: false,
  // eslint-disable-next-line no-unused-vars
  execute (message, botVer) {
    const changelog = new Discord.MessageEmbed()
      .setColor('#FF0057')
      .setTitle('Changelog')
      .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
      .setDescription('Pre-Release 1')
      .addFields(
        { name: 'Re-writen the whole framework', value: 'Now instead of the bot consisting on one file, now the commands are divided on multiple files!' },
        { name: 'Bugs deleted', value: 'Since the rewrite, there was loads and loads of bugs, most of them fixed.' },
        { name: 'A better place... for developers', value: 'This pre-release took a lot of time and effort to make. Now hopefully, you can\'t say that this code is a mess.' },
        { name: 'Embeds, loads of them', value: 'Yay! Everyone\'s favorite way to send beautiful messages is now here!' },
        { name: 'Added many commands', value: 'Commands each update are really important to me (and you), so I added 10 commands!' }
      )
      .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png')
    message.channel.send(changelog)
  }
}
