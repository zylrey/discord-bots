const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'open',
    description: 'Change the voice channel name to "status: open"',
    data: new SlashCommandBuilder()
        .setName('open')
        .setDescription('Change the voice channel name to "status: open"'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const channelId = '1241459342381678622'; // Your voice channel ID
        const channel = interaction.guild.channels.cache.get(channelId);
        if (channel) {
            await channel.setName('Status: Open🟢');
            await interaction.editReply({ content: 'Channel name changed to "status: open"' });
        } else {
            await interaction.editReply({ content: 'Channel not found' });
        }
    }
};
