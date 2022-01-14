const Discord = require('discord.js')
module.exports = {
  name: 'boop',
  description: 'Pings the user you mentioned',
  args: true,
  usage: '<user>',
  cooldown: 15,
  wip: false,
  execute (message, botVer) {
    const userToPing = message.mentions.members.first()
    if (userToPing) {
      const BoopSuccessful = new Discord.MessageEmbed()
        .setColor('#FF0057')
        .setTitle('Boop!')
        .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
        .setDescription(`${userToPing}, you Have been booped! ;p`)
        .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Boop.png')
      message.channel.send({embed: BoopSuccessful})
    } else {
      const BoopFailed = new Discord.MessageEmbed()
        .setColor('#FF0057')
        .setTitle('>:(')
        .setAuthor(`stationBot ${botVer}`, 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png')
        .setDescription('Please mention a user to ping/boop.')
        .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Boop.png')
      message.channel.send({embed: BoopFailed})
    }
  }
}
