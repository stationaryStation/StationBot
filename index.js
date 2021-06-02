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
		message.reply('There was an error trying to execute that command!');
	}
});
// After that, login to the bot account.
client.login(config.BOT_TOKEN);

// Change bot's avatar and Username from config.json WIP
// client.user.setAvatar('https://raw.githubusercontent.com/stationaryStation/StationBot/master/ProfilePictures/V2%20(Account).png');
// client.user.setUsername(config.botUsername)