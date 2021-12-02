/**
 *
 * Name: StationBot
 * Description: Bot for discord.
 * Author: StationaryStation
 *
 */
// Add variables for libraries
const Discord = require('discord.js-12')
const fs = require('fs')
// Import Config
const config = require('config.json')

// Make Init function
const init = () => {
  console.log(
    `Logged in as ${client.user.tag}.\n Ver: ${botVer}\n Prefix: ${prefix}`
  )
  console.log('Bot ready for operation.')
  // Check if you are using the Stable version and change status accordingly
  if (config.stable === true) {
    client.user.setActivity(
      `${prefix}help for command list. | Using Current Branch`,
      {
        type: 'LISTENING'
      }
    )
  } else if (isStable === false) {
    client.user.setActivity(
      `${prefix}help for command list. | Using Unstable Branch`,
      {
        type: 'LISTENING'
      }
    )
  } else if (BranchNext === true) {
    client.user.setActivity(
      `${prefix}help for command list. | Using Next Branch`,
      {
        type: 'LISTENING'
      }
    )
  } else if (isPreRelease === true) {
    client.user.setActivity(`${prefix}help for command list. | Pre-Release`, {
      type: 'LISTENING'
    })
  } else {
    // This is just in case of the bot breaking.
    // Perhaps put the error message on a constant?
    console.error(
      'An unexpected error has ocurred. Please report the issue to https://github.com/stationaryStation/stationBot/issues'
    )
    // And then after trowing the error, close StationBot.
    process.exit()
  }
}

if (!config.Token) {
  console.log('No Token Detected.\nPlease add the token in config.json')
  process.exit()
} else if (!config.prefix) {
  console.log('No prefix detected.\nPlease add the prefix in config.json')
}
// Required variables
const botVer = config.botVer
const client = new Discord.Client()
const prefix = config.prefix
/*
Misc variables (Some commands just won't work if this stop existing.)
They already exist but aparently they don't work correctly if i have the config.* (* = anything)
*/
const isStable = config.stable
const BranchNext = config.branchNext
const isPreRelease = config.PreRelease
// Create cooldowns + commands.
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()
const commandFolders = fs.readdirSync('./Commands')
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

// Search for commands on the commands folder (aka ./Commands/)
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./Commands/${folder}`)
    .filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./Commands/${folder}/${file}`)
    client.commands.set(command.name, command)
  }
}
/*
Add the event files (if they exist) Not Used. Maybe fixing it in the future.
 for (const file of eventFiles) {
   const event = require(`./events/${file}`);
   if (event.once) {
     client.once(event.name, (...args) => event.execute(...args, client, prefix, botVer, stable, branchNext));
   } else {
     client.on(event.name, (...args) => event.execute(...args, client, prefix, botVer, stable, branchNext));
   }
 }
Set the prefix to the prefix you edited on config.json
*/
client.on('ready', () => {
  init()
})

// When a message is sended in a guild(Server), it will be logged on the console/output
client.on('message', async message => {
  // Log Every Single message from every single guild

  console.log(
    `${message.author.tag} at ${message.guild} said: ${message.content}\n`
  )

  // Check if the command starts with the prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return
  // If it does, add the command to a constant and declare arguments
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/)
  const command = args.shift().toLowerCase()
  /*
 cooldowns are set with:
   module.exports = {
   //..
   cooldown: <cooldown time (in seconds)>,
   //..
 }
 on the command file (BEFORE THE EXECUTE FUNCTION).
*/
  if (!client.commands.has(command)) return
  const { cooldowns } = client

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000

  if (timestamps.has(message.author.id)) {
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return message.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        )
      }
    }
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
  }

  try {
    // If the command exists, run it with the following variables (if required)
    // Some variables are unused for some commands.
    client.commands.get(command).execute(message, args, botVer, prefix, client)
  } catch (error) {
    // else if the command returns an error, notify the user.
    console.error(
      `There was an error while running ${command}.\nError Stack:{$error}`
    )
    message.reply('There was an error trying to execute that command!')
    message.channel.send(`\`\`\` ${error} \`\`\``)
  }
})
// After that, login to the bot account. Make Sure the variable on the config is called Token and not BOT_TOKEN.
client.login(config.Token)
