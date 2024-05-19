const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Get information about a user.',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'The user you want to get info about',
            required: true,
        },
    ],
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');

        const userEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('User Information')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'User ID', value: user.id, inline: true },
                { name: 'Avatar', value: '[Link to Avatar](' + user.displayAvatarURL({ dynamic: true }) + ')', inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [userEmbed], ephemeral: true });
    },
};
