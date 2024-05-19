const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'confess',
    description: 'Make an anonymous confession.',
    options: [
        {
            name: 'message',
            type: ApplicationCommandOptionType.String,
            description: 'The message you want to confess.',
            required: true,
        },
    ],
    async execute(interaction) {
        const confessionMessage = interaction.options.getString('message');

        const confessionEmbed = new EmbedBuilder()
            .setColor('#FF69B4')
            .setTitle('Anonymous Confession')
            .setDescription(`\n"${confessionMessage}"`)
            .setTimestamp();

        // Find the confession channel by ID or other means
        const confessionChannelId = '1191330446244585512'; // replace with your confession channel ID
        const confessionChannel = interaction.guild.channels.cache.get(confessionChannelId);

        if (confessionChannel) {
            await confessionChannel.send({ embeds: [confessionEmbed] });
            await interaction.reply({ content: 'Your confession has been sent anonymously!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Confession channel not found. Please contact the server admin.', ephemeral: true });
        }
    },
};
