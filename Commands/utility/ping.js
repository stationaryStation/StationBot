const Discord = require('Discord.js')
module.exports = {
    name: 'Ping',
    description: 'Tells the User his ping with an embed',
    // eslint-disable-next-line no-unused-vars
    execute(message, args, botVer, prefix){
        const timeTaken = Date.now() - message.createdTimestamp;
        const PingEmbed = new Discord.MessageEmbed()
        .setColor('#FF0057')
        .setTitle(`Pong!`)
        .setAuthor(`stationBot ${botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
        .setDescription(`Your current ping is: ${timeTaken}`)
        .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Ping.png`);
            message.channel.send(PingEmbed);
    }
}