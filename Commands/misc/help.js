const { prefix } = require('../../config.json')
module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  // aliases: ['commands'], / Not used but i will try to implement it later.
  usage: '<command_name>',
  cooldown: 5,
  wip: false,
  execute (message, args) {
    // Declare a constant array with name of data and a constant with all commands
    const data = []
    const { commands } = message.client
    // If there isn't any arguments, push command list to the constant data and send the command list to the user via DM
    if (!args.length) {
      data.push('Here\'s a list of all my commands:')
      data.push(commands.map(command => command.name).join(', '))
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('I\'ve sent you a direct message with all my commands!')
        })
        // If it returns a error, log it and warn the user about it.
        .catch(error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
          message.reply('it seems like I can\'t send a direct message to you! Do you have DMs disabled?')
        })
    }
    // Check if there are any commands called <command_name>
    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))
    // If the command does not exist, send an error message.
    if (!command) {
      return message.reply('that\'s not a valid command!')
    }

    data.push(`**Name:** ${command.name}`)
    // Check if there is a <command.something> and push it to data
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description) data.push(`**Description:** ${command.description}`)
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)
    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)
    if (command.wip) data.push('**Marked as Work In Progress**')
    if (command.dev) data.push('*Developer command intended for developers*')
    // Finally send the command with all it's data
    message.channel.send(data, { split: true })
  }
}
