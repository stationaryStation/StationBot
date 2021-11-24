const fetch = require('node-fetch')
module.exports = {
  name: 'cat',
  description: 'Searches a random image of a cat',
  args: false,
  cooldown: 5,
  wip: false,
  async execute (message) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json())
    message.channel.send(file)
  }
}
