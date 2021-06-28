const Discord = require('discord.js')
const fs = require('fs')
const {token, botVer, stable, nextBranch, prerelease, prefix} = require('./config.json')
// libs above
const client = new Discord.Client()
const bot_token = token;
const bot_version = botVer;
const bot_stable = stable;
const bot_prefix = prefix;
// required stuff for bot above.

// Create commands and cooldowns
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./Commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.find === 'welcome-channel');
  //If the channel name isn't found then do nothing
  if (!channel) return;
  channel.send(`Welcome to our server, ${member}!\n We hope you have a nice day!`)
})

client.on('ready', Ready => {
    console.log(`Logged in as ${client.user.tag}.\nVersion: ${bot_version}\nPrefix: ${prefix}`);
    console.log(`Bot is ready to recieve commands!`)
    if (bot_stable == true) {
      client.user.setActivity(`${prefix}help for command list!`, {
        type: 'LISTENING'
      });
    }else if (bot_stable == false) {
      client.user.setActivity(`${prefix}help for command list! | Using Unstable mode`, {
        type: 'LISTENING'
      });
    }else if (bot_stable == null) {
      console.log('No stable mode detected. Quitting...')
      process.exit();
    }
});

client.on("message", async message => {
  function logMessages() {
    console.log(`${message.author.tag} at ${message.guild} said: ${message.content}`) //Log all messages on the console via this function
  }

  logMessages();

  if (!message.content.startsWith(bot_prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases.includes(commandName));

  if (!client.commands.has(commandName)) return;
  
  if (!command) return;

  if (command.guildOnly && message.channel.type == "dm") {
    return message.channel.send (`Sorry, it seems that \`\`\`${command.name}\`\`\` is only available on servers and not in DMs.`)
  }

  if(command.args && !args.length){
    return message.channel.send(`You didn't provide any arguments, ${message.author}`)
  }

  try {
    command.execute(message, args, bot_version, bot_stable, bot_prefix);
  } catch(error) {
    message.channel.send(`Invalid or missing command called \`\`\`${commandName}\`\`\``);
    message.channel.send(`\`\`\`${error}\`\`\``)
  }
});

client.login(bot_token);

