const Discord = require("discord.js");
const Event = require("../Structures/Event.js");

module.exports = new Event("guildMemberAdd", async (client, member) => {
  if (member.guild.id === "888400944692355092") {
    const joinChannel = await member.guild.channels.cache.get("888812794118541393");
    const joinEmbed = new Discord.MessageEmbed()
    .setTitle("A member left or got kicked...")
    .setColor("RED")
    .setAuthor(member.user.tag)
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setFooter(`ID: ${member.user.id}`)
    .addField("User Joined At:", member.joinedAt.toUTCString())
    joinChannel.send({
      embeds: [joinEmbed]
    });
  }
});