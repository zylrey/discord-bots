const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'dclink',
    description: 'Provides the Discord server invite link',
    data: new SlashCommandBuilder()
        .setName('dclink')
        .setDescription('Provides the Discord server invite link'),
    async execute(interaction) {
        await interaction.reply('Join our Discord server: https://discord.gg/5vbgsnDFcX');
    },
};
