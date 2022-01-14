module.exports = {
  name: "message",
  once: false,
  execute(message) {
    console.log(`${message.author.tag} @ ${message.guild} | ${message.content}`)
  }
}
