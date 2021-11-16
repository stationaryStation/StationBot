const ytdl = require('ytdl-core');
const { AudioPlayerStatus, StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnectiont, getVoiceConnection } = require('@discordjs/voice');
const { VoiceChannel } = require('discord.js');

module.exports = {
	name: 'music',
	description: "Plays music from youtube using ytdl-core",
	wip: true,
	args: true,
	usage: '<cmd> <url>',
	execute(message, args){
		const cmd = args[0]
		const url = args[1]
		if (cmd === 'play'){
			const connection = joinVoiceChannel({
				channelId: VoiceChannel.id,
				guildId: guild.id,
				adapterCreator: guild.voiceAdapterCreator,
			});

			const stream = ytdl(url, { filter: 'audioonly' });
			const resource = createAudioResource(stream, {inputType: StreamType.Arbitrary })
			const player = createAudioPlayer();

			player.play(resource);
			connection.subscribe(player);

			player.on(AudioPlayerStatus.Idle, () => connection.destroy());
		} if (cmd === 'stop') {
			const connected = getVoiceConnection(VoiceChannel.guild.id);

			if (connected) {
				const connection = joinVoiceChannel({
					channelId: VoiceChannel.id,
					guildId: guild.id,
					adapterCreator: guild.VoiceAdapterCreator,
				})
				connection.destroy()
			} else {
				message.channel.send("The bot already isn't in a voice channel.");
			}
		}
		
	}
}
