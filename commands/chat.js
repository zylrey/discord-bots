const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'chat',
    description: 'Send a direct message to a user.',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'The user you want to message.',
            required: true,
        },
        {
            name: 'message',
            type: ApplicationCommandOptionType.String,
            description: 'The message you want to send.',
            required: true,
        },
    ],
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const messageContent = interaction.options.getString('message');

        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Message from ZyyyL BOT')
                .setDescription(messageContent)
                .setTimestamp();

            await targetUser.send({ embeds: [embed] });
            await interaction.reply({ content: `Message sent to ${targetUser}`, ephemeral: true });
        } catch (error) {
            console.error(`Failed to send message to ${targetUser}:`, error);
            await interaction.reply({ content: `Failed to send message to ${targetUser}.`, ephemeral: true });
        }
    },
};
