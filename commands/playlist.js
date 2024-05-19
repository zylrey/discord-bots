const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'playlist',
    description: 'Get links to Spotify playlists.',
    execute(interaction) {
        const playlists = [
            'https://open.spotify.com/playlist/4NHM3HqdFHRyQifPo9GZAB',
            'https://open.spotify.com/playlist/0F0vphj4Yxo2mnTdK7DfvY',
            'https://open.spotify.com/playlist/13iSbdMLXzAHDFigf7HzQw',
            'https://open.spotify.com/playlist/3yoHGf6XfEjgbqZOAtpL9N?si=d68ef8fad04a4701',
            'https://open.spotify.com/playlist/0rIIdmkxGY6aNR87qhDOjX',
            'https://open.spotify.com/playlist/37i9dQZF1E4DFhBRbnlRbC',
            'https://open.spotify.com/playlist/37i9dQZF1DX56bqlsMxJYR',
            'https://open.spotify.com/playlist/18tzVWsaivRqjsq7iq5wJs',
            'https://open.spotify.com/playlist/7xANFuccQdAfxtPGHCEbKX',
            'https://open.spotify.com/playlist/3mt7YKTwDZI4xoehun3uFQ?si=850d08f4bf27498e',
            'https://open.spotify.com/playlist/7xdIOQ5v9dutoZPdeYBvPU'
        ];

        const embed = new MessageEmbed()
            .setColor('#1ED760')
            .setTitle('Spotify Playlists');

        playlists.forEach((playlist, index) => {
            embed.addField(`Playlist ${index + 1}`, playlist);
        });

        interaction.reply({ embeds: [embed] });
    },
};
