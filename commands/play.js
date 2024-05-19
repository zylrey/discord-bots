const { ApplicationCommandOptionType } = require('discord.js');
const { useMainPlayer } = require('discord-player');
const { isInVoiceChannel } = require('../utils/voicechannel');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

// Set the FFMPEG_PATH environment variable
process.env.FFMPEG_PATH = ffmpeg.path;

module.exports = {
    name: 'play',
    description: 'Play a song in your channel!',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'The song you want to play',
            required: true,
        },
    ],
    async execute(interaction) {
        const { default: Conf } = await import('conf');
        try {
            const inVoiceChannel = isInVoiceChannel(interaction);
            if (!inVoiceChannel) {
                return interaction.reply({
                    content: 'You need to be in a voice channel to use this command!',
                    ephemeral: true,
                });
            }

            await interaction.deferReply();

            const player = useMainPlayer();
            const query = interaction.options.getString('query');
            const searchResult = await player.search(query);

            if (!searchResult || !searchResult.hasTracks()) {
                return interaction.followUp({ content: 'No results were found!' });
            }

            const track = searchResult.tracks[0];
            if (!track) {
                return interaction.followUp({ content: 'No track found!' });
            }

            try {
                const config = new Conf({ projectName: 'volume' });

                await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username,
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: config.get('volume') || 10,
                    },
                });

                await interaction.followUp({
                    content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
                });
            } catch (error) {
                await interaction.editReply({
                    content: 'An error has occurred during playback!',
                });
                console.error('Playback error:', error);  // Enhanced logging
            }
        } catch (error) {
            await interaction.reply({
                content: 'There was an error trying to execute that command: ' + error.message,
            });
            console.error('Command execution error:', error);  // Enhanced logging
        }
    },
};
