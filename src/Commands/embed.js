const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
	name: "embed",
	description: "Shows an embed...",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	run: async (message, args, client) => {
		const embed = new Discord.MessageEmbed();

		const user = message instanceof Discord.CommandInteraction ? message.user : message.author;

		embed
			.setTitle("This is an embed")
			.setDescription(`Hello [${user.tag}](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}) This is a Description`)
			.setColor("GREEN")
			.setFooter("Hello This is a Footer")
			
		message.reply({ embeds: [embed] });
	}
});