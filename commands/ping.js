const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Checks the bot's latency and API ping.",
    cooldown: 7,
    aliases: ["ping"],
    // Add execute function for interaction-based commands
    execute: async (interaction, client) => {
        try {
            let states = "🟢 Excellent";
            let states2 = "🟢 Excellent";
            const msgLatency = Date.now() - interaction.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);

            if (msgLatency > 70) states = "🟢 Good";
            if (msgLatency > 170) states = "🟡 Not Bad";
            if (msgLatency > 350) states = "🔴 So Bad";
            if (apiLatency > 70) states2 = "🟢 Good";
            if (apiLatency > 170) states2 = "🟡 Not Bad";
            if (apiLatency > 350) states2 = "🔴 So Bad";

            const embed = new EmbedBuilder()
                .setTitle("Pong!")
                .setColor("#2F3136")
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .addFields(
                    { name: "**Time Taken:**", value: `${msgLatency} ms\n${states}\n` },
                    { name: "**WebSocket:**", value: `${apiLatency} ms\n${states2}` }
                )
                .setTimestamp()
                .setFooter({ text: `Requested By ${interaction.user.tag}` });

            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    },
    // Retain run function for message-based commands
    run: async (client, message) => {
        try {
            let states = "🟢 Excellent";
            let states2 = "🟢 Excellent";
            const msgLatency = Date.now() - message.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);

            if (msgLatency > 70) states = "🟢 Good";
            if (msgLatency > 170) states = "🟡 Not Bad";
            if (msgLatency > 350) states = "🔴 So Bad";
            if (apiLatency > 70) states2 = "🟢 Good";
            if (apiLatency > 170) states2 = "🟡 Not Bad";
            if (apiLatency > 350) states2 = "🔴 So Bad";

            if (message.author.bot) return;

            const embed = new EmbedBuilder()
                .setTitle("Pong!")
                .setColor("#2F3136")
                .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
                .addFields(
                    { name: "**Time Taken:**", value: `${msgLatency} ms\n${states}\n` },
                    { name: "**WebSocket:**", value: `${apiLatency} ms\n${states2}` }
                )
                .setTimestamp()
                .setFooter({ text: `Requested By ${message.author.tag}` });

            await message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    }
};
