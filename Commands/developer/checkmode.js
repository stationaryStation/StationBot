const {branchNext, stable} = require('../../config.json')
module.exports = {
    name: 'checkmode',
    description: 'Checks the current bot mode',
    args: false,
    cooldown: 2,
    wip: false,
    execute(message) {
        if (stable == true) { // if unstable mode is true then say on the channel that unstable mode is on
            message.channel.send("Running on stable mode.");
        } else if (stable == false){ // if stable mode is true then say on the channel that stable mode is on
            message.channel.send("Running on unstable mode.");
        } else if (branchNext == true) {
            message.channel.send("Running on stable mode.");
        } else {
            message.channel.send("An unexpected error has occurred. Please report it with st!issue");
        }
    }
}