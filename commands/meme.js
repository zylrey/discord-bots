const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json"); // Import config.json instead of config.js
const fetch = require("node-fetch");

module.exports = {
  name: "meme",
  aliases: [],
  description: "Send A Meme!",
  usage: "Meme",
  run: async (client, message, args) => {
    // Start
    message.delete();
    fetch("https://meme-api.herokuapp.com/gimme")
      .then(res => res.json())
      .then(json => {
        let embed = new MessageEmbed()
          .setColor(config.Color) // Access Color property from config.json
          .setTitle(`${json.title}`)
          .setURL(json.postLink)
          .setImage(json.url)
          .setFooter(`From /r/${json.subreddit}`);

        message.channel.send(embed);
      });

    // End
  }
};
