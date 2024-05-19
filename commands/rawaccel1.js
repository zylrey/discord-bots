const { EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'rawaccel1',
    description: 'Send an embedded message with a specific image.',
    async execute(interaction, client) {
        const imagePath = path.join(__dirname, '../resources/rawaccel1.png');
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Raw Accel Image')
            .setImage('attachment://rawaccel1.png')
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            files: [{
                attachment: imagePath,
                name: 'rawaccel1.png'
            }]
        });
    },
};
