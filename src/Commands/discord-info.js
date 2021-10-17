const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
  name: "discord-info",
  description: "Get the information of something by mentioning it.",
  types: "TEXT",
  slashCommandOptions: [],
  permission: "ADMINISTRATOR",
  run: async (message, args, client) => {
    const user = message.mentions.users.first();
    const channel = message.mentions.channels.first();
    const role = message.mentions.roles.first();
    
    if (!user && !channel && !role) return message.reply("Not found...");
    
    if (channel) {
      const topic = channel.topic || "No topic set."
      const channelEmbed = new Discord.MessageEmbed()
      .setColor("#760dff")
      .setTitle(`Channel Found: **${channel.name}**`)
      .setDescription(`Topic: ${topic}`)
      .addFields({
        name: "Channel ID:",
        value: `${channel.id}`,
        inline: true
      }, {
        name: "Channel Guild:",
        value: channel.guild.name,
        inline: true
      })
      .setFooter(`${message.author.id}/${message.author.username}`)
      
      message.channel.send({
        embeds: [channelEmbed]
      });
    }
    
    if (role) {
      const roleEmbed = new Discord.MessageEmbed()
      .setColor("#760dff")
      .setTitle(`Role Found: **${role.name}**`)
      .setDescription(`Color: ${role.color}`)
      .addFields({
        name: "Role ID:",
        value: `${role.id}`,
        inline: true
      }, {
        name: "Role Guild:",
        value: role.guild.name,
        inline: true
      })
      .setFooter(`${message.author.id}/${message.author.username}`)

      message.channel.send({
        embeds: [roleEmbed]
      });
    }

    if (user) {
      let bot = undefined
      if (user.bot) bot = "true";
      if (!user.bot) bot = "false";

      const userEmbed = new Discord.MessageEmbed()
      .setColor("#760dff")
      .setTitle(`User Found: ${user.username}`)
      .setDescription(`User Tag: ${user.username}#${user.discriminator}`)
      .addFields({
        name: "User ID:",
        value: `${user.id}`,
        inline: true
      }, {
        name: "Is Bot:",
        value: bot,
        inline: true
      })
      .setFooter(`${message.author.id}/${message.author.username} + The Mentioned User's Avatar`, user.avatarURL({ dynamic: true, size: 32 }))

      message.channel.send({
        embeds: [userEmbed]
      })
    }
  }
});