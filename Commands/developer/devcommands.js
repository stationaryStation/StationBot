module.exports = {
    name: 'devcommands',
    args: false,
    description: 'Displays the available developer commands',
    execute(message, args){
        message.channel.send(`Current Dev Commands:\n shutdown: Shutdowns the bot. If node.js mode is enabled, the bot will shutdown.\n st!restart: Restarts the bot, if you are the owner.\n st!checkmode: Lists the current mode`);
    }
}