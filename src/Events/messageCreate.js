const Event = require("../Structures/Event.js");
const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new Event("messageCreate", async (client, message) => {
	if (message.author.bot) return;
	
	if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.toLowerCase().substring(client.prefix.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

	if (!command) return message.reply(`${args[0]} is not a valid command!`);

	if (!["BOTH", "TEXT"].includes(command.type))
		return message.reply(
			"That command is only available via slash command!"
		);

	const permission = message.member.permissions.has(command.permission, true);

	if (!permission)
		return message.reply(`You do not have the permission \`${command.permission}\` to run this command!`);

	command.run(message, args, client);
});