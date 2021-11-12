module.exports = {
	name: 'say',
	description: 'Make the bot say something',
	args: true,
	usage: '<string>',
	execute(message) {
		message.delete()
		let sentence = message.content.split(" ");
    		sentence.shift();
		sentence = sentence.join(" ");
		message.channel.send(sentence);

	}
}
