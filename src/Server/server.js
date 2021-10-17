require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.all("/", (req, res) => {
  res.send("Bot is online...");
});

function kpAlive() {
  app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
  });
}

module.exports = kpAlive;