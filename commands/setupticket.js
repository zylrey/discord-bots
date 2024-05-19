const { Permissions } = require('discord.js');

module.exports = {
    name: 'setupticket',
    description: 'Set up a ticketing system.',
    async execute(interaction) {
        // Check if the user has the necessary permissions to manage channels
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Create a new channel category for tickets
        const category = await interaction.guild.channels.create('Tickets', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone, // Give no one permission by default
                    deny: [Permissions.FLAGS.VIEW_CHANNEL], // Deny viewing the channel
                },
            ],
        });

        // Create a new text channel within the category for ticket creation
        const channel = await interaction.guild.channels.create('ticket-creation', {
            type: 'GUILD_TEXT',
            parent: category.id,
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone, // Deny everyone from viewing
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: interaction.member.roles.highest, // Allow the command user to view
                    allow: ['VIEW_CHANNEL'], // Directly access the VIEW_CHANNEL property
                },
            ],
        });

        // Send a confirmation message
        await interaction.reply({ content: 'Ticketing system set up successfully!', ephemeral: true });
    },
};
