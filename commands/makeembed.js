const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'makeembed',
    description: 'Create and send an embedded message',
    data: new SlashCommandBuilder()
        .setName('makeembed')
        .setDescription('Create and send an embedded message')
        .addStringOption(option => 
            option.setName('title')
                .setDescription('The title of the embed')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('description')
                .setDescription('The description of the embed')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('color')
                .setDescription('The color of the embed (e.g., #ff0000)'))
        .addStringOption(option => 
            option.setName('url')
                .setDescription('The URL of the embed'))
        .addStringOption(option => 
            option.setName('image')
                .setDescription('The image URL of the embed'))
        .addStringOption(option => 
            option.setName('thumbnail')
                .setDescription('The thumbnail URL of the embed')),
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const color = interaction.options.getString('color') || '#00FF00';
        const url = interaction.options.getString('url');
        const image = interaction.options.getString('image');
        const thumbnail = interaction.options.getString('thumbnail');

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color);

        if (url) embed.setURL(url);
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);

        await interaction.reply({ embeds: [embed] });
    }
};
