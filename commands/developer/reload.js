const fs = require('fs');

module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    usage: '<command_name>',
    cooldown: 1,
    aliases: ['rl', 'restart'],
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) {
            return message.channel.send(`There is no command called '${commandName}'`);
        }

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => {
            fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`);
        })

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command '${newCommand.name}' was reload successfully`)
        } catch (err) {
            console.error(err);
            message.channel.send(`There was an error while reloading a Command.`)
        }
    }

}