require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');
const { Player } = require('discord-player');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.extractors.loadDefault().then(r => console.log('Extractors loaded successfully'));

player.events.on('audioTrackAdd', (queue, song) => {
    queue.metadata.channel.send(`🎶 | Song **${song.title}** added to the queue!`);
});

player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send(`▶ | Started playing: **${track.title}**!`);
});

player.events.on('audioTracksAdd', (queue, tracks) => {
    queue.metadata.channel.send(`🎶 | Tracks have been queued!`);
});

player.events.on('disconnect', queue => {
    queue.metadata.channel.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
});

player.events.on('emptyChannel', queue => {
    queue.metadata.channel.send('❌ | Nobody is in the voice channel, leaving...');
});

player.events.on('emptyQueue', queue => {
    queue.metadata.channel.send('✅ | Queue finished!');
    queue.delete();
});

player.events.on('error', (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

client.on('ready', async () => {
    console.log('Ready!');
    client.user.setPresence({
        activities: [{ name: config.activity, type: Number(config.activityType) }],
        status: 'online',
    });

    // Set the bot's username
    client.user.setUsername(config.username)
        .then(() => console.log('Bot username updated successfully'))
        .catch(error => console.error('Error updating bot username:', error));

    const commands = client.commands.map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options || [],
    }));
  
    await client.application.commands.set(commands).then(() => {
        console.log('Slash commands registered globally');
    }).catch(console.error);
});

const ordinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

client.on('guildMemberAdd', async member => {
    if (member.guild.id === '1191321221879566388') {
        // Check if the guild ID matches the intended server
        const welcomeChannel = member.guild.channels.cache.get('1191322759029072033');
        if (welcomeChannel) {
            // If the welcome channel exists, send a welcome message there
            const memberCount = member.guild.memberCount;
            const serverName = member.guild.name;

            const rulesAndGuidelines = `
                **RULES AND GUIDELINES**\n
                - **Be Respectful**\n Treat everyone with kindness and respect. No harassment, hate speech, or bullying will be tolerated.\n
                - **Keep it Friendly**\n This server is meant for fun and enjoyment. Keep conversations and interactions positive and inclusive.\n
                - **No Spamming**\n Avoid flooding the chat with repeated messages, emojis, or irrelevant content. Let conversations flow naturally.\n
                - **Stay on Topic**\n Keep discussions relevant to the channels they're in. If you want to talk about something else, find the appropriate channel or create one.\n
                - **Respect Privacy**\n Don't share personal information about yourself or others without their consent. This includes addresses, phone numbers, and social media profiles.\n
                - **No NSFW Content**\n Keep all content safe for work. This means no explicit language, images, or topics.\n
                - **Listen to Moderators**\n Follow the instructions of the moderators. They're here to help keep the server running smoothly and ensure everyone has a good time.\n
                - **Use Appropriate Channels**:\n Use the designated channels for different topics (e.g., gaming, general chat, memes) to keep conversations organized.\n
                - **No Advertising**\n Don't promote other Discord servers, products, or services without permission from the moderators.\n
                - **Have Fun!**\n Most importantly, enjoy your time here! This server is meant to be a place where people can relax, play games, and hang out with friends.\n
            `;

            const embed = new EmbedBuilder()
                .setTitle('Welcome to the Server!')
                .setDescription(`Welcome to ${serverName} ${member}! You are the ${ordinalSuffix(memberCount)} member on this server.\n\n${rulesAndGuidelines}`)
                .setColor('#00FF00')
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();

            // Send the welcome message to the welcome channel
            welcomeChannel.send({ embeds: [embed] }).then(() => {
                console.log('Welcome message sent');
            }).catch(error => {
                console.error('Failed to send welcome message:', error);
            });

            // Send a DM to the member
            try {
                await member.send(`Welcome to **${serverName}** ${member}! You are the ${ordinalSuffix(memberCount)} member on this server.`);
                console.log('Welcome DM sent');
            } catch (error) {
                console.error('Failed to send welcome DM:', error);
            }

        } else {
            console.error('Welcome channel not found');
        }
    } else {
        console.log('Incorrect guild ID');
    }
});
  
client.on('guildMemberRemove', member => {
    console.log('guildMemberRemove event triggered');
    if (member.guild.id === '1191321221879566388') {
        console.log('Correct guild ID');
        const channel = member.guild.channels.cache.get('1241349062490456206');
        if (channel) {
            console.log('Channel found');
            const memberCount = member.guild.memberCount;
            const serverName = member.guild.name;
  
            const embed = new EmbedBuilder()
                .setTitle('Goodbye!')
                .setDescription(`${member.user.tag} has left ${serverName}. We now have ${memberCount} members.`)
                .setColor('#FF0000')
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();
  
            channel.send({ embeds: [embed] }).then(() => {
                console.log('Goodbye message sent');
            }).catch(error => {
                console.error('Failed to send goodbye message:', error);
            });
        } else {
            console.error('Channel not found');
        }
    } else {
        console.log('Incorrect guild ID');
    }
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();
    
    if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
        const commands = client.commands.map(cmd => ({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options || [],
        }));

        await message.guild.commands.set(commands).then(() => {
            message.reply('Deployed!');
        }).catch(err => {
            message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
            console.error(err);
        });
    }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName.toLowerCase());

  if (!command) {
      await interaction.reply({
          content: 'Command not found!',
          ephemeral: true
      });
      return;
  }

  try {
      await command.execute(interaction, client);
  } catch (error) {
      console.error(error);
      await interaction.followUp({
          content: 'There was an error trying to execute that command!',
          ephemeral: true
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
