const Discord = require("discord.js");
const Event = require("../Structures/Event.js");

module.exports = new Event("guildMemberAdd", async (client, member) => {
  if (member.guild.id === "888400944692355092") {
    const joinChannel = await member.guild.channels.cache.get("888812794118541393");
    const memberRole = await member.guild.roles.cache.get("888821813105295391");
    
    if (!member.roles.cache.has("888821813105295391")) {
      await member.roles.add(memberRole);
    }
    
    const joinEmbed = new Discord.MessageEmbed()
    .setTitle("Welcome to Unknown-Discorders!")
    .setColor("GREEN")
    .setAuthor(member.user.tag)
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setFooter(`ID: ${member.user.id}`)
    .addFields({
      name: "Account Created:",
      value: member.user.createdAt.toUTCString(),
      inline: true
    }, {
      name: "User Joined At:",
      value: member.joinedAt.toUTCString(),
      inline: true
    })
    
    joinChannel.send({
      embeds: [joinEmbed]
    });
  }
});