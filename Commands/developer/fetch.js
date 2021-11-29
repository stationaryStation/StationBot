const fetch = require('node-fetch')
module.exports = {
    name: 'fetch',
    description: 'Fetches some data from a remote server',
    wip: true,
    cooldown: 10,
    args: true,
    usage: '<url> <content_in_json_format>',
    async execute (message, args) {
        // Make constants for fetching arguments from the message
        const url = args[0]
        const content_to_fetch = args[1]
        // Fetch url and content
        const { file } = await fetch(url, {
            method: 'GET',
            body: JSON.stringify(content_to_fetch),
            headers: { 'Content-Type': 'application/json'}
        })
                                .then(res => res.text())
                                .then(text => message.channel.send(`Fetched:\n${text}`))
    }
}