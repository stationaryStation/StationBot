const fs = require('fs');
module.exports = {
  name: "reload",
  description: "Reloads the specified command.",
  args: true,
  wip: true, 
  usage: '<command>',
  execute(message, args) {
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName) || message.client.commmands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.channel.send(`There isn't a command or alias with \`\`\` ${commandName}\`\`\`, ${message.author}!`);
    }

    const commandFolders = fs.readdirSync(`./Commands/`);
    const folderName =  commandFolders.find(folder => fs.readdirSync(`./Commands/${folder}`).includes(`${commandName}`));

    delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);

      message.channel.send(`Command \`\`\`${newCommand.name}\`\`\` was reloaded!`);
    }catch (error) {
      console.log(error);
      message.channel.send(`Something went wrong while reloading \`\`\`${command.name}\`\`\`: \n\`\`\`${error.message}\`\`\``)
    }
  },
};
