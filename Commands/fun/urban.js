const querystring = require('querystring')
const fetch = require('node-fetch')
const Discord = require('discord.js')
module.exports = {
    name: 'urban',
    description: 'Searches the urban dictionary',
    args: true,
    usage: '<searchTerm>',
    cooldown: 5,
    async execute(message, args) {
        if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());
            if (!list.length) {
                return message.channel.send(`No results found for **${args.join(' ')}**.`);
            }
            const [answer] = list;
            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        const embed = new Discord.MessageEmbed()
	.setColor('#FF0057')
	.setTitle(answer.word)
	.setURL(answer.permalink)
	.addFields(
		{ name: 'Definition', value: trim(answer.definition, 1024) },
		{ name: 'Example', value: trim(answer.example, 1024) },
		{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
        )
    .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Urban.png');

        message.channel.send(embed);
    }
}