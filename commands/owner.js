const { EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'owner',
    description: 'Send an embedded message with a specific image.',
    async execute(interaction, client) {
        const imagePath = path.join(__dirname, '../resources/owner.png');
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Owner Link:\nhttps://github.com/zylrey\nFB Link:\nhttps://facebook.com/zel.pon')
            .setImage('attachment://owner.png')
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            files: [{
                attachment: imagePath,
                name: 'owner.png'
            }]
        });
    },
};
