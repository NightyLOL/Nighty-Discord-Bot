const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
	name: "gift",
	description: "Gifts a mentioned role!",
	type: "TEXT",
	slashCommandOptions: [],
	permission: "ADMINISTRATOR",
	run: async (message, args, client) => {
	  const roleId = message.mentions?.roles?.first().id;
    if (!roleId) return;
    
    client.db.set("roleId", roleId);
    client.db.set("gifterId", message.author.id);
    
	  const giftEmbed = new Discord.MessageEmbed()
	  .setTitle("A Wild Gift Appears!")
	  .setDescription(`<@&${roleId}> gifted by ${message.author.username}, click to claim before someone else does!`)
	  .setColor("#0da146")
	  .setFooter(`Gifter's ID: ${message.author.id}`)
	  const giftRow = new Discord.MessageActionRow()
	  .addComponents(
	    new Discord.MessageButton()
	    .setStyle("SUCCESS")
	    .setCustomId("gift_claim")
	    .setLabel("Claim Gift Role")
	  )
	  
	  message.reply({
	    embeds: [giftEmbed],
	    components: [giftRow]
	  });
	}
});
