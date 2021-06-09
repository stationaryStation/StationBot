// ./ProfilePictures/unstable.png
// Add variables for libraries
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

// Required variables
const botVer = config.botVer;
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./Commands');

// Search for commands
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./Commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
// Set the prefix to the prefix you edited on config.json
const prefix = config.prefix
// When the bot is ready, the presence is set to the help command.
client.on('ready', () => {
  // Log the bot's tag, version and prefix 
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
    console.log(`${message.author.tag} at ${message.guild} said: ${message.content}\n`);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
/* cooldowns are set with
* /..
* cooldown: <cooldown time (in seconds)>,
*/
	if (!client.commands.has(command)) return;
  const { cooldowns } = client;

if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }
timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);  
}

	try {
		client.commands.get(command).execute(message, args, botVer, prefix, client);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});
// After that, login to the bot account.
client.login(config.BOT_TOKEN);


// Change bot's avatar and Username from config.json WIP


// bot.setUsername(config.botUsername)