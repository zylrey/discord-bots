const { Permissions } = require('discord.js');

module.exports = {
    name: 'lockdown',
    description: 'Lock down the current text channel.',
    async execute(interaction) {
        // Check if the interaction is in a guild
        if (!interaction.guild) {
            return void interaction.reply('This command can only be used in a server.');
        }

        // Get the current text channel where the command is used
        const channel = interaction.channel;

        try {
            // Update permissions to disallow sending messages for @everyone role
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
            });

            await interaction.reply('Channel locked down!');
        } catch (error) {
            console.error('Failed to lock down channel:', error);
            await interaction.reply('Failed to lock down channel. Please check the bot\'s permissions.');
        }
    },
};
