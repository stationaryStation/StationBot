module.exports = {
    name: 'devcommands',
    args: false,
    description: 'Displays the available developer commands',
    cooldown: 5,
    wip: false,
    // eslint-disable-next-line no-unused-vars
    execute(message){
        message.channel.send(`Current Dev Commands:\n shutdown: Shutdowns the bot. If node.js mode is enabled, the bot will shutdown.\n st!restart: Restarts the bot, if you are the owner.\n st!checkmode: Lists the current mode`);
    }
}