const filter = require("leo-profanity")

module.exports = {
    "name": "message",
    "once": false,
    execute(message) {
        if (filter.check(message.content)) {
            console.log(`Potencial Offensive message found. Content:${message.content}\nFiltring...`)
            message.delete();
            message.channel.send("This message was filtered because it contained a offensive word.\nIf the message was filtered wrongfully, please report the issue to https://github.com/stationarystation/stationbot/issues")
            console.log(`Message eliminated`)
        }
    }
}