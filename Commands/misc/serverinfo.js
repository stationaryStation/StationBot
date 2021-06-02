const Discord = require('discord.js')
module.exports = {
    name: 'serverinfo',
    args: false,
    description: 'List\' server information',
    // eslint-disable-next-line no-unused-vars
    execute(message, args, botVer, prefix) {
        const serverInfoEmbed = new Discord.MessageEmbed()
        .setColor('#FF0057')
        .setTitle(`Server Information`)
        .setAuthor(`stationBot ${botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
        .setDescription(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`)
        .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20SeverInfo.png`)
            message.channel.send(serverInfoEmbed)
    }
   
}