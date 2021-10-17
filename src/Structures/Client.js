require('dotenv').config();

const Discord = require("discord.js");

const Command = require("./Command.js");

const Event = require("./Event.js");

const Database = require("@replit/database")

const config = require("../Data/config.json");

const db = new Database();

const kpAlive = require("../Server/server.js");

const intents = new Discord.Intents(32767);

const fs = require("fs");

class Client extends Discord.Client {
	constructor() {
		super({
		  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
		  intents 
		});

		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();

		this.prefix = config.prefix;
		this.keepAlive = kpAlive;
		this.db = db;
	}

	start(token) {
	  console.log("[Client] Starting up the bot");
		// Command Handler
		const commandFiles = fs.readdirSync("./src/Commands")
			.filter(file => file.endsWith(".js"));

		/**
		 * @type {Command[]}
		 */
		const commands = commandFiles.map(file => require(`../Commands/${file}`));

		commands.forEach(cmd => {
			console.log(`[Client-Command] Command ${cmd.name} loaded`);
			this.commands.set(cmd.name, cmd);
		});

		const slashCommands = commands
			.filter(cmd => ["BOTH", "SLASH"].includes(cmd.type))
			.map(cmd => ({
				name: cmd.name.toLowerCase(),
				description: cmd.description,
				permissions: [],
				options: cmd.slashCommandOptions,
				defaultPermission: true
			}));
		
		this.removeAllListeners();

		this.on("ready", async () => {
			const cmds = await this.application.commands.set(slashCommands);

			cmds.forEach(cmd => console.log(`[Client-SCommand] Slash Command ${cmd.name} registered`));
		});

		fs.readdirSync("./src/Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				console.log(`[Client-Event] Event ${event.event} loaded`);
				this.on(event.event, event.run.bind(null, this));
			});

		this.login(token);
	}
}

module.exports = Client;