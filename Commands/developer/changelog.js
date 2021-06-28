const Discord = require('discord.js')
module.exports = {
    name: 'changelog',
    description: 'lists the changelog for stationaryStation\'s StationBot',
    aliases: ['chl', "changes", "syschanges"],
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, bot_prefix, bot_version){
        const changelog = new Discord.MessageEmbed()
        .setColor('#FF0057')
        .setTitle(`Changelog`)
        .setAuthor(`stationBot 1.2.0 Pre-Release 1`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
        .setDescription(`Pre-Release 1`)
        .addFields(
            {name: 'Re-writen the whole framework', value: 'Now instead of the bot consisting on one file, now the commands are divided on multiple files!'},
            {name: 'Bugs deleted', value: 'Since the rewrite, there was loads and loads of bugs, most of them fixed.'},
            {name: 'A better place... for developers', value: 'This pre-release took a lot of time and effort to make. Now hopefully, you can\'t say that this code is a mess.'},
            {name: 'Embeds, loads of them', value: 'Yay! Everyone\'s favorite way to send beautiful messages is now here!'}
        )
        .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Plus.png`)
        message.channel.send(changelog)
    }
}
