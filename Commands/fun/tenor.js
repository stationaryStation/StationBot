const fetch = require('fetch')
const Discord = require('discord.js')
const TENOR_KEY = "OBU9CHJJLKNM"
module.exports = {
    name: 'tenor',
    args: true,
    usage: '<searchTerm>',
    description: 'Searches a gif in tenor.com',
    // eslint-disable-next-line no-unused-vars
    async execute(message, args, botVer, prefix){
        const searchTerm = args.join(' ')
        // searchTerm is a argument which means that the syntax is st!tenor <searchTerm>
        if (!searchTerm){
            const SearchFailed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Oops!`)
                    .setAuthor(`stationBot ${botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your search term is misssing, please insert a valid search tearm.`)
                    .setFooter('Error 1')
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png`)
                    message.channel.send(SearchFailed);
                    console.log(`${message.author.tag} searched on tenor ${searchTerm} but failed.`)
        } else {
            let url = `https://g.tenor.com/v1/search?q=${searchTerm}&key=${TENOR_KEY}&limit=8`
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.results.length);
            message.channel.send(json.results[index].url);
            console.log(`${message.author.tag} searched on tenor ${searchTerm}.`)
        }
    }
}