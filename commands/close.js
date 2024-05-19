const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'close',
    description: 'Change the voice channel name to "status: closed"',
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Change the voice channel name to "status: closed"'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const channelId = '1241459342381678622'; // Your voice channel ID
        const channel = interaction.guild.channels.cache.get(channelId);
        if (channel) {
            await channel.setName('Status: Closed🔴');
            await interaction.editReply({ content: 'Channel name changed to "status: closed"' });
        } else {
            await interaction.editReply({ content: 'Channel not found' });
        }
    }
};
