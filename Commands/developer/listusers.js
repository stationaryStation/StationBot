module.exports = {
  name: 'listusers',
  descriptions: 'List users on this guild.',
  cooldown: 10,
  args: false,
  wip: true,
  execute (message) {
    const list = message.guild.members.cache.array()
    const members = list.toString().split()
    console.log(`${members}`)
    message.channel.send(`Online users in this guild:\n${list}`)
  }
}
