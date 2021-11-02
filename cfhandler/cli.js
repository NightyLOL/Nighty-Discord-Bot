#!/usr/bin/env node

const fs = require("fs");
const readlineSync = require("readline-sync");

if (process.argv[2]) {
  if (process.argv[2] == "-crt" || process.argv[2] == "--create") {
    const cfc = require("../config/cfc.json");
    let filename = readlineSync.question("\x1b[31m*\x1b[0m File-name: ");
    if (!filename) {
      console.log("\x1b[31m\x1b[40m[Error]\x1b[0m \x1b[31mFile name cannot be left empty.\x1b[0m");
      process.exit(1);
    }
    if (filename == "--|exit") process.exit(0);
    if (!filename.endsWith(".js")) filename = filename + ".js";
    let cmdName = readlineSync.question("Command-Name: ");
    if (!cmdName) {
      console.log("\x1b[33m\x1b[40m[Warn]\x1b[0m \x1b[33mSetting Command Name To Default: \x1b[35m\"ping\"\x1b[33m.\x1b[0m");
      cmdName = "ping";
    }
    if (cmdName == "--|exit") process.exit(0);
    const cmdDesc = readlineSync.question("Command-Desc: ");
    let cmdType = readlineSync.question("Command-Type: ");
    if (!cmdType) cmdType = "TEXT";
    if (cmdType == "--|exit") process.exit(0);
    let cmdPerm = readlineSync.question("Command-Perm: ");
    if (!cmdPerm) cmdPerm = "SEND_MESSAGES";
    if (cmdPerm == "--|exit") process.exit(0);
    
    if (process.argv[3] && process.argv[3] == "-sc") {
      fs.writeFileSync(cfc.path + filename, `const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
	name: "${cmdName}",
	description: "${cmdDesc}",
	type: "${cmdType}",
	slashCommandOptions: [],
	permission: "${cmdPerm}",
	run: async (message, args, client) => {
		
	}
});`);
      console.log(`Wrote to file \x1b[35m"${filename}"\x1b[0m.`);
      process.exit(0);
    }

    let answ = readlineSync.question("\x1b[36mCreate file?\x1b[33m ");
    console.log("\x1b[0m");
    if (!answ || answ == "n") answ = "no";
    if (answ == "no") {
      console.log("\x1b[33m\x1b[40m[Warn]\x1b[0m \x1b[33mAborted...\x1b[0m");
      process.exit(0);
    }

    fs.writeFileSync(cfc.path + filename, `const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
	name: "${cmdName}",
	description: "${cmdDesc}",
	type: "${cmdType}",
	slashCommandOptions: [],
	permission: "${cmdPerm}",
	run: async (message, args, client) => {
		
	}
});`);

    console.log(`Wrote to file \x1b[35m"${filename}"\x1b[0m.`);
    process.exit(0);
  }
}