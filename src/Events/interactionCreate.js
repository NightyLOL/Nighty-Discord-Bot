const Event = require("../Structures/Event.js");
const Discord = require("discord.js");

module.exports = new Event("interactionCreate", async (client, interaction) => {
  if (!interaction.user.bot && interaction.isButton() && interaction.guild) {
	  if (interaction.customId === "gift_claim") {
	    const roleId = await client.db.get("roleId");
	    
	    if (interaction.member.roles.cache.has(roleId)) return;
	    
	    const gifterId = await client.db.get("gifterId");
	    const intUserId = interaction.user.id;
	    const member = await interaction.guild.members.fetch(intUserId);
	    const role = await interaction.guild.roles.cache.get(roleId);
	    await member.roles.add(role);
	    const claimedEmbed = new Discord.MessageEmbed()
	    .setTitle("Uh Oh.....")
	    .setDescription(`This gift has been claimed by ${member.user.tag}, better luck next time`)
	    .setColor("#738574")
	    .setFooter(`Gifter's ID: ${gifterId}`)
	    const disClaimed = new Discord.MessageActionRow()
	    .addComponents(
	      new Discord.MessageButton()
	      .setLabel("Claim Gift Role")
	      .setStyle("SUCCESS")
	      .setCustomId("dis_claim_btn")
	      .setDisabled(true)
	    )
	    
	    await interaction.update({
	      embeds: [claimedEmbed],
	      components: [disClaimed]
	    });
	    
	    client.db.delete('roleId');
	    client.db.delete('gifterId');
	  }
  }
  
  if (interaction.user.bot || !interaction.isCommand() || !interaction.guild) return;

  const args = [
    interaction.commandName,
    ...client.commands
    .find(cmd => cmd.name.toLowerCase() == interaction.commandName).slashCommandOptions.map(v => `${interaction.options.get(v.name).value}`)
  ];

  const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

  if (!command) return interaction.reply("That is not a valid command!");

  const permission = interaction.member.permissions.has(command.permission);

  if (!permission)
    return interaction.reply("You do not have the correct permissions to run this command!");

  command.run(interaction, args, client);
});