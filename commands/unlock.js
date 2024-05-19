const { Permissions } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'Unlock the current text channel.',
    async execute(interaction) {
        // Check if the interaction is in a guild
        if (!interaction.guild) {
            return void interaction.reply('This command can only be used in a server.');
        }

        // Get the current text channel where the command is used
        const channel = interaction.channel;

        try {
            // Reset permissions for @everyone role in the channel
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SEND_MESSAGES: null, // Reset to default
            });

            await interaction.reply('Channel unlocked!');
        } catch (error) {
            console.error('Failed to unlock channel:', error);
            await interaction.reply('Failed to unlock channel. Please check the bot\'s permissions.');
        }
    },
};
