const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const botVer = config.botVer;
// Required variables
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
const prefix = config.prefix
const fetch = require('node-fetch');
const querystring = require('querystring');
// When the bot is ready, the presence is set to the help command.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.\n Ver: ${config.botVer}\n Prefix: ${prefix}`);
  console.log('Bot ready for operation.');
  if (config.stable == true){
    client.user.setActivity(`${prefix}help for command list. | Using Current Branch`, {
        type: 'LISTENING'
     });
  } else if (config.stable == false) {
    client.user.setActivity(`${prefix}help for command list. | Using Unstable Branch`, {
        type: 'LISTENING'
     });
  }else if (config.branchNext == true){
    client.user.setActivity(`${prefix}help for command list. | Using Next Branch`, {
        type: 'LISTENING'
     });
  }else if (config.PreRelease == true){
    client.user.setActivity(`${prefix}help for command list. | Pre-Release`, {
        type: 'LISTENING'
     });
  } else {
      // This is just in case of the bot breaking.
      console.error("An unexpected error has ocurred. Please report the issue to https://github.com/stationaryStation/stationBot/issues");

      // eslint-disable-next-line no-undef
      process.exit();
  }
  
});
// When a message is sended in a guild(Server), it will be logged on the console/output
client.on("message", async message => {
    console.log(`${message.author.tag} at ${message.guild.name} said: ${message.content}\n`);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, botVer, prefix);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
    // test if the bot works
    if (command === "test") {
       
    }
    // Kick Command
    if (command === "kick") {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick('Someone was kicked using st!kick').then(() => {
                    message.reply(`Successfully kicked ${user.tag} `)
                }).catch(err => {
                    message.reply(`Failed to kick ${user.tag}. Do i got the necessary permissions?`);
                    console.error(err);
                });
            } else {
                message.reply("That user isn't in this server!");
            }
        } else {
            message.reply("You didn't mention the user to kick!")
        }
    }
    // ban command
    if (command === "ban") {
        const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.ban('Someone was banned using st!ban').then(() => {
                        message.reply(`Successfully ban ${user.tag} `)
                    }).catch(err => {
                        message.reply(`Failed to ban ${user.tag}. Do i got the necessary permissions?`);
                        console.error(err);
                    });
                } else {
                    message.reply("That user isn't in this guild!");
                }
            } else {
                message.reply("You didn't mention the user to ban!");
            }
        } 
    if (command == "urban"){
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
// After that, login to the bot account.
client.login(config.BOT_TOKEN);

// Change bot's avatar and Username from config.json WIP
// client.user.setAvatar('https://raw.githubusercontent.com/stationaryStation/StationBot/master/ProfilePictures/V2%20(Account).png');
// client.user.setUsername(config.botUsername)