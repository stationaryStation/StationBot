module.exports = {
	name: 'say',
	description: 'Make the bot say something',
	args: true,
	usage: '<string>',
	execute(message) {
		let sentence = message.content.split(" ");
    		sentence.shift();
		sentence = sentence.join(" ");
		message.channel.send(sentence);

	}
}
