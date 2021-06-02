const Discord = require('discord.js')
module.exports = {
    name: 'botinfo',
    args: false,
    description: 'Displays information about the bot',
    execute(message, args) {
         // Create a Embed message with bot information
         const timeTaken = Date.now() - message.createdTimestamp;
         const botInfoEmbed = new Discord.MessageEmbed()
     .setColor('#FF0057')
     .setTitle(`StationBot ${config.botVer}`)
     .setURL('https://github.com/stationaryStation/stationBot')
     .setAuthor('stationaryStation', 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png', 'https://github.com/stationaryStation')
     .setDescription(`StationBot by stationaryStation\nA bot for moderation made with the powerful discord.js engine.`)
     .addFields(
         {name: 'Ping', value: `${timeTaken}`},
         {name: 'Current Version', value: `${config.botVer}`},
         {name: 'Github Branch', value: 'Pre-Release 1'}
     )
     .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png')
     .setFooter('This is pre-release software, this might be unstable at times. Please refer to github.com/stationaryStation/StationBot/issues to report any bug.')
         // Then send the embed to the user's channel
         message.channel.send(botInfoEmbed)
    }
}